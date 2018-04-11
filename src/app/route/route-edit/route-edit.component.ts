import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatabaseService} from '../../providers/database.service';
import {StoreService} from '../../providers/store.service';

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.scss']
})
export class RouteEditComponent implements OnInit, OnDestroy {
  routeDoc: any;
  sub: any;
  currentCategory: string;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router,
    private storeService: StoreService
  ) {
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit() {
    this.currentCategory = this.storeService.getCurrent('category');
    this.getRoute();
  }

  async submit(newDoc) {
    try {
      await newDoc.save();
      this.router.navigate(['/category/details', this.currentCategory]);
    } catch (err) {
      throw err;
    }
  }

  private async getRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    const db = await this.databaseService.get();

    const obs$ = db.route
      .findOne()
      .where('id').eq(id)
      .$;

    this.sub = obs$.subscribe(data => {
      this.routeDoc = data;
      this.zone.run(() => {
      });
    });
  }
}
