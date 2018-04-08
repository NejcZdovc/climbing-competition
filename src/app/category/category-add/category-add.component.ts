import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../providers/database.service';
import {CompetitionService} from '../../providers/competition.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  currentCompetition: string = null;
  tempDoc: any;

  constructor(
    private databaseService: DatabaseService,
    private competitionService: CompetitionService
  ) { }

  async ngOnInit() {
    this.currentCompetition = this.competitionService.getCurrent();

    await this.newDocument();
  }

  async newDocument() {
    const db = await this.databaseService.get();
    this.tempDoc = db.category.newDocument({});
  }

  async submit(newDoc) {
    try {
      newDoc.competitionId = this.currentCompetition;
      await newDoc.save();
      await this.newDocument();
    } catch (err) {
      throw err;
    }
  }
}

