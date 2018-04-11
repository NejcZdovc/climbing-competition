import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {CategoryDocument} from '../../database/types/category';
import {ActivatedRoute} from '@angular/router';
import {DatabaseService} from '../../providers/database.service';
import {RouteDocument} from '../../database/types/route';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  category: CategoryDocument;
  routes: RouteDocument[];
  categorySub;
  routesSub;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private zone: NgZone
  ) { }

  ngOnDestroy () {
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }

    if (this.routesSub) {
      this.routesSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.getCategory();
  }

  private async getCategory() {
    const id = this.route.snapshot.paramMap.get('id');
    const db = await this.databaseService.get();

    const obs$ = db.category
      .findOne()
      .where('id').eq(id)
      .$;

    this.categorySub = obs$.subscribe((data: CategoryDocument) => {
      this.category = data;
      this.getRoutes(db, data);
      this.zone.run(() => { });
    });
  }

  private getRoutes(db, category: CategoryDocument) {
    if (!category) {
      return;
    }

    const obs$ = db.route
      .find()
      .sort({createdAt: 1})
      .where('categoryId').eq(category.id)
      .$;

    this.routesSub = obs$.subscribe((data: RouteDocument[]) => {
      this.routes = data;
      this.zone.run(() => { });
    });
  }
}
