import {Component, Input} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';

import {Competitor} from './competitor';
import {CompetitorService} from '../../shared/services/competitor.service';

@Component({
    selector: 'cc-competitor-edit',
    moduleId: module.id,
    templateUrl: './competitor.edit.component.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers:  [CompetitorService]
})

export class CompetitorEditComponent {
    @Input() competitor: Competitor;
    catId: number;

    form: ControlGroup;
    firstname: Control;
    lastname: Control;
    birth: Control;
    club: Control;
    ranking: Control;
    startNumber: Control;
    category_id: Control;
    id: Control;

    constructor(
        private _fb: FormBuilder,
        private _routeParams: RouteParams,
        private _router: Router,
        private _competitorService: CompetitorService
    ) {
        let id = +this._routeParams.get('id');
        this.catId = +this._routeParams.get('cat_id');

        this._competitorService
            .getCompetitor(id)
            .subscribe(res => {
                this.competitor = res;

                this.firstname = new Control(this.competitor.firstname, Validators.required);
                this.lastname = new Control(this.competitor.lastname, Validators.required);
                this.birth = new Control(this.competitor.birth, Validators.required);
                this.club = new Control(this.competitor.club, Validators.required);
                this.startNumber = new Control(this.competitor.startNumber);
                this.ranking = new Control(this.competitor.ranking);
                this.category_id = new Control(this.catId, Validators.required);
                this.id = new Control(this.competitor.id, Validators.required);

                this.form = _fb.group({
                    firstname: this.firstname,
                    lastname: this.lastname,
                    birth: this.birth,
                    club: this.club,
                    ranking: this.ranking,
                    startNumber: this.startNumber,
                    category_id: this.category_id,
                    id: this.id
                });
            });
    }

    onSubmit() {
        this._competitorService.saveCompetitor(this.form.value).subscribe(res => console.log(res));
    }
}
