import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouteDocument} from '../../database/types/route';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss']
})
export class RouteFormComponent implements OnInit {
  @Input() doc: RouteDocument;
  @Input() category: string;
  @Output() OnUpdate: EventEmitter<RouteDocument> = new EventEmitter<RouteDocument>();

  constructor() { }

  ngOnInit() {
  }

  onSave() {
    this.OnUpdate.emit(this.doc);
  }
}
