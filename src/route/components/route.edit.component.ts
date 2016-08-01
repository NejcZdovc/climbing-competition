import {Component, Input} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';

import {Route} from './route';
import {RouteService} from '../../shared/services/route.service';

@Component({
    selector: 'cc-route-edit',
    moduleId: module.id,
    templateUrl: './route.edit.component.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers:  [RouteService]
})

export class RouteEditComponent {
    @Input() route: Route;
    catId: number;

    form: ControlGroup;
    name: Control;
    referee: Control;
    routesetter: Control;
    time: Control;
    category_id: Control;
    id: Control;

    constructor(private _fb: FormBuilder, private _routeParams: RouteParams, private _router: Router, private _routeService: RouteService) {
        let id = +this._routeParams.get('id');
        this.catId = +this._routeParams.get('cat_id');

        this._routeService
            .getRoute(id)
            .subscribe(res => {
                this.route = res;

                this.name = new Control(this.route.name, Validators.required);
                this.referee = new Control(this.route.referee, Validators.required);
                this.routesetter = new Control(this.route.routesetter, Validators.required);
                this.time = new Control(this.route.time.toString(), Validators.required);
                this.category_id = new Control(this.catId, Validators.required);
                this.id = new Control(this.route.id, Validators.required);

                this.form = _fb.group({
                    name: this.name,
                    referee: this.referee,
                    routesetter: this.routesetter,
                    time: this.time,
                    category_id: this.category_id,
                    id: this.id
                });
            });
    }

    onSubmit() {
        this._routeService.saveRoute(this.form.value).subscribe(res => console.log(res));
    }
}
