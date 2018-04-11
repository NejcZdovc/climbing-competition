import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../providers/database.service';
import {StoreService} from '../../providers/store.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  currentCompetition: string = null;
  tempCategory: any;

  constructor(
    private databaseService: DatabaseService,
    private storeService: StoreService
  ) { }

  async ngOnInit() {
    this.currentCompetition = this.storeService.getCurrent('competition');

    await this.newCategory();
  }

  async newCategory() {
    const db = await this.databaseService.get();
    this.tempCategory = db.category.newDocument({});
  }

  async submit(newDoc) {
    try {
      newDoc.competitionId = this.currentCompetition;
      await newDoc.save();
      await this.newCategory();
    } catch (err) {
      throw err;
    }
  }
}

