import {Component} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';

import {RouteService} from '../../shared/services/route.service';

@Component({
    selector: 'cc-route-add',
    moduleId: module.id,
    templateUrl: './route.add.component.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers:  [RouteService]
})

export class RouteAddComponent {
    form: ControlGroup;
    name: Control;
    referee: Control;
    routesetter: Control;
    time: Control;
    category_id: Control;

    catId: number;

    constructor(private _fb: FormBuilder, private _routeParams: RouteParams, private _router: Router, private _routeService: RouteService) {
        this.catId = +this._routeParams.get('cat_id');

        this.name = new Control('', Validators.required);
        this.referee = new Control('', Validators.required);
        this.routesetter = new Control('', Validators.required);
        this.time = new Control('', Validators.required);
        this.category_id = new Control(this.catId, Validators.required);

        this.form = _fb.group({
            name: this.name,
            referee: this.referee,
            routesetter: this.routesetter,
            time: this.time,
            category_id: this.category_id
        });
    }

    onSubmit() {
        this._routeService.createRoute(this.form.value).subscribe(res => console.log(res));
    }
}
