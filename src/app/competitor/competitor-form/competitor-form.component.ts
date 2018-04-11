import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompetitorDocument} from '../../database/types/competitor';

@Component({
  selector: 'app-competitor-form',
  templateUrl: './competitor-form.component.html',
  styleUrls: ['./competitor-form.component.scss']
})
export class CompetitorFormComponent implements OnInit {
  @Input() doc: CompetitorDocument;
  @Input() category: string;
  @Output() OnUpdate: EventEmitter<CompetitorDocument> = new EventEmitter<CompetitorDocument>();

  constructor() { }

  ngOnInit() {
  }

  onSave() {
    this.doc.birthYear = +this.doc.birthYear;
    this.OnUpdate.emit(this.doc);
  }
}
