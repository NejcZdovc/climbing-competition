import {Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseService} from '../../providers/database.service';
import {StoreService} from '../../providers/store.service';
import {RouteDocument} from '../../database/types/route';
import {MatCheckboxChange, MatSort, MatTableDataSource} from '@angular/material';
import { combineLatest } from 'rxjs/observable/combineLatest';
import {CompetitorDocument} from '../../database/types/competitor';
import * as Immutable from 'immutable';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-category-competitors',
  templateUrl: './category-competitors.component.html',
  styleUrls: ['./category-competitors.component.scss']
})
export class CategoryCompetitorsComponent implements OnInit, OnDestroy {
  displayedColumns: string[];
  sub;
  currentCategory: string;
  dataSource;
  routes;
  db;
  competitors: CompetitorDocument[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private zone: NgZone,
    private storeService: StoreService
  ) { }

  ngOnDestroy () {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit() {
    this.currentCategory = this.storeService.getCurrent('category');
    this.getTableData();
  }

  onAttempt (data: MatCheckboxChange, competitor: CompetitorDocument, route) {
    try {
      competitor.results[`route_${route.index}`].attempt = data.checked;
      competitor.save();
    } catch (err) {
      throw err;
    }
  }

  onTop (data: MatCheckboxChange, competitor: CompetitorDocument, route) {
    try {
      competitor.results[`route_${route.index}`].top = data.checked;
      competitor.save();
    } catch (err) {
      throw err;
    }
  }

  onHeight (data: KeyboardEvent, competitor: CompetitorDocument, route) {
    try {
      const height = parseFloat((data.target as HTMLInputElement).value)
      if (!isNaN(height)) {
        competitor.results[`route_${route.index}`].height = height;
        competitor.save();
      }
    } catch (err) {
      throw err;
    }
  }

  onDelete(competitor: CompetitorDocument) {
    const result = confirm(`Are you sure that you would like to delete ${competitor.firstName} ${competitor.lastName}?`);
    if (result === true) {
      competitor.remove();
    }
  }

  onCalculate() {
    this.db.competitor
      .find()
      .sort({startNumber: 1})
      .where('categoryId').eq(this.currentCategory)
      .exec()
      .then((competitors: CompetitorDocument[]) => {
        this.calc(competitors);
      });
  }

  onImport (file: FileList) {
    const self = this;

    if (file) {
      Papa.parse(file[0], {
        complete: function(results) {
          console.log(results);
          if (!self.competitors || self.competitors.length > 0) {
            alert('Your cateogry is already populated');
            return;
          }

          if (results && Array.isArray(results.data)) {
            results.data.forEach((result: string[], index: number) => {
              if (result.length > 3) {
                self.db.competitor.newDocument(
                  {
                    firstName: result[0],
                    lastName: result[1],
                    club: result[3],
                    birthYear: +result[2],
                    categoryId: self.currentCategory,
                    startNumber: index + 1,
                    results: {
                      points: 0,
                      ranking: 0,
                      route_1: {
                        height: 0,
                        attempt: false,
                        top: false
                      },
                      route_2: {
                        height: 0,
                        attempt: false,
                        top: false
                      },
                      route_3: {
                        height: 0,
                        attempt: false,
                        top: false
                      },
                      route_4: {
                        height: 0,
                        attempt: false,
                        top: false
                      }
                    }
                  }
                ).save();
              }
            });
          }
        }
      });
    }
  }

  private calc (competitors: CompetitorDocument[]) {
    const competitorsImmutable = Immutable.fromJS(competitors);
    const routesCount = this.routes.length || 0;
    const competitorsCount = competitors.length;

    if (competitorsCount === 0) {
      return;
    }

    for (let i = 0; i < routesCount; i++) {
      const routeName = `route_${(i + 1)}`;

      competitors = competitors
        // Add additional height based on attempt flag
        .map((competitor: CompetitorDocument) => {
          if (!competitor.results[routeName].height) {
            competitor.results[routeName].height = 0;
          }

          if (competitor.results[routeName].attempt) {
            // TODO this change should not be saved to the db
            competitor.results[routeName].height = parseFloat(competitor.results[routeName].height) + 0.000001;
          }

          competitor.results[routeName].points = 0;
          competitor.results[routeName].ranking = 0;

          return competitor;
        })



      // Sort based on height desc
      competitors = competitors
        .sort((first, second) => {
          return -(first.results[routeName].height - second.results[routeName].height);
        });

      // Calculating points depending on height
      for (let j = 0; j < competitorsCount; j++) {
        let k;

        if ((j + 1) === competitorsCount) {
          k = j - 1;
        } else {
          k = j + 1;
        }

        const jHeight = competitors[j].results[routeName].height;

        // Check if competitors have same height
        if (jHeight === competitors[k].results[routeName].height) {
          let points = k;
          let l = 1;

          do {
            k++;
            if (competitorsCount === k) {
              break;
            }

            points = points + k;
            l++;
          } while (jHeight === competitors[k].results[routeName].height);


          points = points / l;

          for (let m = j; m < k; m++) {
            competitors[m].results[routeName].rank = j + 1;
            competitors[m].results[routeName].points = points;
          }

          j = k - 1;
        } else {
          competitors[j].results[routeName].rank = j + 1;
          competitors[j].results[routeName].points = j + 1;
        }
      }
    }

    // Total results
    competitors = competitors.map((competitor: CompetitorDocument) => {
      let total = 0;

      for (let i = 0; i < routesCount; i++) {
        const routeName = `route_${(i + 1)}`;

        if (i === 0) {
          total = competitor.results[routeName].points;
        } else {
          total *= competitor.results[routeName].points;
        }
      }

      competitor.results.total = Math.pow(total, routesCount);

      return competitor;
    });


    // Sort total points asc
    competitors = competitors
      .sort((first, second) => {
        return first.results.total - second.results.total;
      });

    for (let i = 0; i < competitorsCount; i++) {
      if (i === 0) {
        competitors[i].results.ranking = 1;
      } else {
        if (competitors[i].results.total === competitors[(i - 1)].results.total) {
          competitors[i].results.ranking = competitors[(i - 1)].results.ranking;
        } else {
          competitors[i].results.ranking = i + 1;
        }
      }

      competitors[i].save();
    }
  }

  private async getTableData () {
    this.db = await this.databaseService.get();
    const competitors$ = this.db.competitor
      .find()
      .sort({startNumber: 1})
      .where('categoryId').eq(this.currentCategory)
      .$;

    const routes$ = this.db.route
      .find()
      .where('categoryId').eq(this.currentCategory)
      .$;

    this.sub = combineLatest(competitors$, routes$).subscribe(data => {
      const competitors: CompetitorDocument[] = data[0];
      const routes: RouteDocument[] = data[1];
      this.competitors = competitors;
      this.generateTableData(routes, competitors);
      this.zone.run(() => {});
    });
  }

  private generateTableData (routes, competitors) {
    this.displayedColumns = ['startNumber', 'name'];

    this.routes = routes.map((route, index) => {
      const i = index + 1;
      this.displayedColumns.push(`route_${i}`);
      return {
        index: i,
        columnDef: `route_${i}`,
        header: `Route ${i}`
      };
    });

    this.displayedColumns.push('ranking');
    this.displayedColumns.push('actions');
    this.dataSource = new MatTableDataSource(competitors);
    this.dataSource.sortingDataAccessor = (data: CompetitorDocument, property: string) => {
      switch (property) {
        case 'startNumber': return +data.startNumber;
        case 'route_1': return +data.results['route_1'].height;
        case 'route_2': return +data.results['route_2'].height;
        case 'ranking': return +data.results.ranking;
        default: return '';
      }
    };
    this.dataSource.sort = this.sort;
  }
}
