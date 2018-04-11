import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../providers/store.service';
import {DatabaseService} from '../../providers/database.service';

@Component({
  selector: 'app-route-add',
  templateUrl: './route-add.component.html',
  styleUrls: ['./route-add.component.scss']
})
export class RouteAddComponent implements OnInit {
  currentCategory: string = null;
  tempRoute: any;

  constructor(
    private databaseService: DatabaseService,
    private storeService: StoreService
  ) {
  }

  async ngOnInit() {
    this.currentCategory = this.storeService.getCurrent('category');
    await this.newRoute();
  }

  async newRoute() {
    const db = await this.databaseService.get();
    this.tempRoute = db.route.newDocument({});
  }

  async submit(newDoc) {
    try {
      newDoc.categoryId = this.currentCategory;
      await newDoc.save();
      await this.newRoute();
    } catch (err) {
      throw err;
    }
  }
}
