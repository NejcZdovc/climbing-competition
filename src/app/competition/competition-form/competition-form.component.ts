import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompetitionDocument} from '../../database/types/competition';

@Component({
  selector: 'app-competition-form',
  templateUrl: './competition-form.component.html',
  styleUrls: ['./competition-form.component.scss']
})
export class CompetitionFormComponent implements OnInit {
  @Input() doc: CompetitionDocument;
  @Output() OnUpdate: EventEmitter<CompetitionDocument> = new EventEmitter<CompetitionDocument>();

  constructor() { }

  ngOnInit() {
  }

  onSave() {
    this.OnUpdate.emit(this.doc);
  }
}
