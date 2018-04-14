import {Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RouteDocument} from '../../database/types/route';
import {CompetitorDocument} from '../../database/types/competitor';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../providers/store.service';
import {DatabaseService} from '../../providers/database.service';
import {CategoryDocument} from '../../database/types/category';
import {CompetitionDocument} from '../../database/types/competition';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-category-print',
  templateUrl: './category-print.component.html',
  styleUrls: ['./category-print.component.scss']
})
export class CategoryPrintComponent implements OnInit, OnDestroy {
  currentCompetition: string;
  currentCategory: string;
  competition: CompetitionDocument;
  category: CategoryDocument;
  totalNum: number;
  sub;
  displayedColumns;
  routes;
  dataSource;
  type: string;
  isStartList: boolean;

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

  onPrint () {
    window.print();
  }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    this.isStartList = this.type === 'start'
    this.currentCategory = this.storeService.getCurrent('category');
    this.currentCompetition = this.storeService.getCurrent('competition');
    this.getData();
  }

  private async getData () {
    const db = await this.databaseService.get();
    const competitors$ = db.competitor
      .find()
      .sort({startNumber: 1})
      .where('categoryId').eq(this.currentCategory)
      .$;

    const routes$ = db.route
      .find()
      .where('categoryId').eq(this.currentCategory)
      .$;

    const category$ = db.category
      .findOne()
      .where('id').eq(this.currentCategory)
      .$;

    const competition$ = db.competition
      .findOne()
      .where('id').eq(this.currentCompetition)
      .$;

    this.sub = combineLatest(competitors$, routes$, category$, competition$).subscribe(data => {
      const competitors: CompetitorDocument[] = data[0];
      const routes: RouteDocument[] = data[1];
      this.category = data[2];
      this.competition = data[3];
      this.totalNum = competitors.length;
      this.generateTableData(routes, competitors);
      this.zone.run(() => {});
    });
  }

  private generateTableData (routes, competitors) {
    this.displayedColumns = ['ranking', 'name', 'club'];

    if (!this.isStartList) {
      this.routes = routes.reduce((prev, route, index) => {
        const i = index + 1;
        this.displayedColumns.push(`route_${i}_height`);
        this.displayedColumns.push(`route_${i}_ranking`);

        prev.push({
          index: i,
          height: true,
          columnDef: `route_${i}_height`,
          header: `Smer ${i} - Višina`
        });

        prev.push({
          index: i,
          height: false,
          columnDef: `route_${i}_ranking`,
          header: `Smer ${i} - Uvrstitev`
        });

        return prev;
      }, []);
    }

    this.dataSource = new MatTableDataSource(competitors);
    this.dataSource.sortingDataAccessor = (data: CompetitorDocument, property: string) => {
      switch (property) {
        case 'ranking':
          {
            if (this.type === 'start') {
              return +data.startNumber;
            } else {
              return +data.results.ranking;
            }
          }
        default: return '';
      }
    };
    this.dataSource.sort = this.sort;
  }
}
