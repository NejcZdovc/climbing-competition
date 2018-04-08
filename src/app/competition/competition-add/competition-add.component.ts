import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../providers/database.service';

@Component({
  selector: 'app-competition-add',
  templateUrl: './competition-add.component.html',
  styleUrls: ['./competition-add.component.scss']
})
export class CompetitionAddComponent implements OnInit {
  tempDoc: any;

  constructor(private databaseService: DatabaseService) { }

  async ngOnInit() {
    await this.newDocument();
  }

  async newDocument() {
    const db = await this.databaseService.get();
    this.tempDoc = db.competition.newDocument({});
  }

  async submit(newDoc) {
    try {
      await newDoc.save();
      await this.newDocument();
    } catch (err) {
      throw err;
    }
  }
}
