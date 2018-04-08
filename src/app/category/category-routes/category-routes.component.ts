import {Component, Input, OnInit} from '@angular/core';
import {RouteDocument} from '../../database/types/route';

@Component({
  selector: 'app-category-routes',
  templateUrl: './category-routes.component.html',
  styleUrls: ['./category-routes.component.scss']
})
export class CategoryRoutesComponent implements OnInit {
  @Input() routes: RouteDocument[];

  constructor() { }

  ngOnInit() {
  }

  onDelete(route: RouteDocument) {
    const result = confirm(`Are you sure that you would like to delete ${route.name}?`);
    if (result === true) {
      route.remove();
    }
  }
}
