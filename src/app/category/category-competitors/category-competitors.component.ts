import {Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseService} from '../../providers/database.service';
import {CompetitorDocument} from '../../database/types/competitor';
import {StoreService} from '../../providers/store.service';
import {RouteDocument} from '../../database/types/route';
import {MatTableDataSource} from '@angular/material';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-category-competitors',
  templateUrl: './category-competitors.component.html',
  styleUrls: ['./category-competitors.component.scss']
})
export class CategoryCompetitorsComponent implements OnInit, OnDestroy {
  displayedColumns: string[]
  sub;
  currentCategory: string;
  dataSource;
  routes: RouteDocument[];

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

  private async getTableData () {
    const db = await this.databaseService.get();
    const competitors$ = db.competitor
      .find()
      .where('categoryId').eq(this.currentCategory)
      .$;

    const routes$ = db.route
      .find()
      .where('categoryId').eq(this.currentCategory)
      .$;

    this.sub = combineLatest(competitors$, routes$).subscribe(data => {
      const competitors = data[0]
      const routes = data[1]
      this.generateTableData(routes, competitors)
      this.zone.run(() => {});
    });
  }

  private generateTableData (routes, competitors) {
    this.routes = routes.map((route, index) => {
      const i = index + 1
      return {
        columnDef: `route_${i}`,
        header: `Route ${i}`,
        route: (test) => {
          console.log(test);
        }
      };
    });

    const data = competitors.map(competitor => {
      const object = {
        startNumber: competitor.startNumber || 1,
        firstName: competitor.firstName,
        lastName: competitor.lastName,
        club: competitor.club,
        ranking: competitor.ranking || -1,
        id: competitor.id
      };

      const numRoutes = routes.length;
      for (let i = 0; i < numRoutes; i++) {
        object[`route_${(i + 1)}`] = 1;
      }

      return object;
    });
    console.log(data);
    this.dataSource = new MatTableDataSource(data);
  }
}
