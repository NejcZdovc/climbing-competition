import {Component} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {ORDERBY_PROVIDERS} from '../../shared/common/order.by';

import {Competitor} from '../../competitor/components/competitor';

import {Route} from '../../route/components/route';
import {RouteService} from '../../shared/services/route.service';

import {ResultService} from '../../shared/services/result.service';

import {Category} from '../../category/components/category';
import {CategoryService} from '../../shared/services/category.service';

@Component({
    selector: 'cc-result-list',
    moduleId: module.id,
    templateUrl: './result.list.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers:  [ResultService, RouteService, CategoryService],
    pipes: [ORDERBY_PROVIDERS]
})

export class ResultListComponent {
    competitors: Competitor[];
    routes: Route[];
    category: Category;
    catId: number;
    total: number;
    partial: number;
    blank: number;

    constructor(
        private _routeParams: RouteParams,
        private _router: Router,
        private _resultService: ResultService,
        private _routeService: RouteService,
        private _categoryService: CategoryService
    ) {
        this.catId = +this._routeParams.get('id');
        this.partial = +this._routeParams.get('partial');
        this.blank = +this._routeParams.get('blank');
        this._categoryService.getCategory(this.catId).subscribe(res => this.category = res);
        this._routeService.getRoutes(this.catId).subscribe(res => this.routes = res);
        this._resultService.getResults(this.catId).subscribe(res => {
            this.competitors = res;
            this.total = this.competitors.length;
        });
    }
}
