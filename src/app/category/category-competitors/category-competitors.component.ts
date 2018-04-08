import {Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseService} from '../../providers/database.service';
import {CompetitorDocument} from '../../database/types/competitor';
import {StoreService} from '../../providers/store.service';
import {RouteDocument} from '../../database/types/route';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-category-competitors',
  templateUrl: './category-competitors.component.html',
  styleUrls: ['./category-competitors.component.scss']
})
export class CategoryCompetitorsComponent implements OnInit, OnDestroy, OnChanges {
  displayedColumns: string[]
  sub;
  currentCategory: string;
  dataSource;
  @Input() routes: RouteDocument[];

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
  }

  ngOnChanges(changes: SimpleChanges) {
    const routes: SimpleChange = changes.routes;
    if (routes.previousValue !== routes.currentValue) {
      if (routes) {
        const numRoutes = this.routes.length;

        this.displayedColumns = ['startNumber', 'name'];
        for (let i = 0; i < numRoutes; i++) {
          this.displayedColumns.push(`route_${(i + 1)}`);
        }
        this.displayedColumns.push('ranking');
        this.displayedColumns.push('actions');
      }

      this.getTableData(routes.currentValue);
    }
  }

  private async getTableData (routes: RouteDocument[]) {
    const db = await this.databaseService.get();
    db.competitor
      .find()
      .where('categoryId').eq(this.currentCategory)
      .exec()
      .then((competitors: CompetitorDocument[]) => {
        const data = competitors.map(competitor => {
          let object = {
            startNumber: competitor.startNumber,
            firstName: competitor.firstName,
            lastName: competitor.lastName,
            club: competitor.club,
            ranking: competitor.ranking,
            id: competitor.id
          };

          const numRoutes = routes.length;
          for (let i = 0; i < numRoutes; i++) {
            object[`route_${(i + 1)}`] = 1;
          }

          return object;
        });
        this.dataSource = new MatTableDataSource(data);
      });
  }
}
