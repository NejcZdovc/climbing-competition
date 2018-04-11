import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryDocument} from '../../database/types/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Input() doc: CategoryDocument;
  @Output() OnUpdate: EventEmitter<CategoryDocument> = new EventEmitter<CategoryDocument>();

  constructor() { }

  ngOnInit() {
  }

  onSave() {
    this.OnUpdate.emit(this.doc);
  }
}
