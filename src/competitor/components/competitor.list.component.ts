import {Component} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {Competitor} from './competitor';

import {Route} from '../../route/components/route';
import {RouteService} from '../../shared/services/route.service';

import {ResultService} from '../../shared/services/result.service';

@Component({
    selector: 'cc-competitor-list',
    moduleId: module.id,
    templateUrl: './competitor.list.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers:  [ResultService, RouteService]
})

export class CompetitorListComponent {
    competitors: Competitor[];
    routes: Route[];
    catId: number;
    autoSave:boolean = false;

    constructor(
        private _routeParams: RouteParams,
        private _router: Router,
        private _resultService: ResultService,
        private _routeService: RouteService
    ) {
        this.catId = +this._routeParams.get('id');
        this._routeService.getRoutes(this.catId).subscribe(res => this.routes = res);
        this._resultService.getResults(this.catId).subscribe(res => this.competitors = res );
    }

    shuffleList() {
        console.log('IMPLEMENT');
    }

    saveList() {
        this._resultService.saveResults(this.competitors).subscribe(res => console.log(res) );
        this._resultService.getResults(this.catId).subscribe(res => this.competitors = res );
    }

    onFocus(event:any) {
        if(event.target.value === '0') {
            event.target.value = '';
        }
    }

    onBlur(event:any, routeId:number, competitorId:number) {
        if(event.target.value === '') {
            event.target.value = '0';
        } else if (event.target.value.indexOf('+') > -1) {
            var ele = document.getElementById('attempt_'+competitorId+'_'+routeId);
            ele.setAttribute('checked', 'checked');
            event.target.value=event.target.value.replace('+', '');
        }
    }
}
