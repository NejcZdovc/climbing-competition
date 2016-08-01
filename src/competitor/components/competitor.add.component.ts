import {Component} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';

import {CompetitorService} from '../../shared/services/competitor.service';

@Component({
    selector: 'cc-competitor-add',
    moduleId: module.id,
    templateUrl: './competitor.add.component.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers:  [CompetitorService]
})

export class CompetitorAddComponent {
    form: ControlGroup;
    firstname: Control;
    lastname: Control;
    birth: Control;
    club: Control;
    ranking: Control;
    startNumber: Control;
    category_id: Control;

    catId: number;

    constructor(
        private _fb: FormBuilder,
        private _routeParams: RouteParams,
        private _router: Router,
        private _competitorService: CompetitorService
    ) {
        this.catId = +this._routeParams.get('cat_id');

        this.firstname = new Control('', Validators.required);
        this.lastname = new Control('', Validators.required);
        this.birth = new Control('', Validators.required);
        this.club = new Control('', Validators.required);
        this.startNumber = new Control('', Validators.required);
        this.ranking = new Control('');
        this.category_id = new Control(this.catId, Validators.required);

        this.form = _fb.group({
            firstname: this.firstname,
            lastname: this.lastname,
            birth: this.birth,
            club: this.club,
            ranking: this.ranking,
            startNumber: this.startNumber,
            category_id: this.category_id
        });
    }

    onSubmit() {
        this._competitorService.createCompetitor(this.form.value).subscribe(res => console.log(res));
    }
}
