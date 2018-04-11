import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../providers/database.service';

@Component({
  selector: 'app-competition-add',
  templateUrl: './competition-add.component.html',
  styleUrls: ['./competition-add.component.scss']
})
export class CompetitionAddComponent implements OnInit {
  tempCompetition: any;

  constructor(private databaseService: DatabaseService) { }

  async ngOnInit() {
    await this.newCompetition();
  }

  async newCompetition() {
    const db = await this.databaseService.get();
    this.tempCompetition = db.competition.newDocument({});
  }

  async submit(newDoc) {
    try {
      await newDoc.save();
      await this.newCompetition();
    } catch (err) {
      throw err;
    }
  }
}
