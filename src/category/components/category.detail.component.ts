import {Component, Input} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import 'rxjs/add/operator/map';

import {Category} from './category';
import {CategoryService} from '../../shared/services/category.service';
import {RouteListComponent} from '../../route/components/route.list.component';
import {CompetitorListComponent} from '../../competitor/components/competitor.list.component';

@Component({
    selector: 'cc-category-detail',
    moduleId: module.id,
    templateUrl: './category.detail.component.html',
    directives: [ROUTER_DIRECTIVES, RouteListComponent, CompetitorListComponent],
    providers:  [CategoryService]
})

export class CategoryDetailComponent {
    @Input() category: Category;

    constructor(private _routeParams: RouteParams, private _router: Router, private _categoryService: CategoryService) {
        let id = +this._routeParams.get('id');

        this._categoryService
            .getCategory(id)
            .subscribe(res => this.category = res);
    }
}
