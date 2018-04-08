import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../providers/store.service';
import {DatabaseService} from '../../providers/database.service';

@Component({
  selector: 'app-competitor-add',
  templateUrl: './competitor-add.component.html',
  styleUrls: ['./competitor-add.component.scss']
})
export class CompetitorAddComponent implements OnInit {
  currentCategory: string = null;
  tempCompetitor: any;

  constructor(
    private databaseService: DatabaseService,
    private storeService: StoreService
  ) { }

  async ngOnInit() {
    this.currentCategory = this.storeService.getCurrent('category');

    await this.newCompetitor();
  }

  async newCompetitor() {
    const db = await this.databaseService.get();
    this.tempCompetitor = db.competitor.newDocument({});
  }

  async submit(newDoc) {
    try {
      newDoc.categoryId = this.currentCategory;
      await newDoc.save();
      await this.newCompetitor();
    } catch (err) {
      throw err;
    }
  }
}
