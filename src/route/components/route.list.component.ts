import {Component} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {Route} from './route';
import {RouteService} from '../../shared/services/route.service';

@Component({
    selector: 'cc-route-list',
    moduleId: module.id,
    templateUrl: './route.list.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers:  [RouteService]
})

export class RouteListComponent {
    routes: Route[];
    catId: number;

    constructor(private _routeParams: RouteParams, private _router: Router, private _routeService: RouteService) {
        this.catId = +this._routeParams.get('id');
        this._routeService.getRoutes(this.catId).subscribe(res => this.routes = res);
    }

    goToEdit(route: Route) {
        this._router.navigate(['RouteEdit', { id: route.id, cat_id: this.catId }]);
    }
}
