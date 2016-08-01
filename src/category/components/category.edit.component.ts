import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup} from 'angular2/common';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {Category} from './category';
import {CategoryService} from '../../shared/services/category.service';

@Component({
    selector: 'cc-category-edit',
    moduleId: module.id,
    templateUrl: './category.edit.component.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers:  [CategoryService]
})

export class CategoryEditComponent {
    @Input() category: Category;

    form: ControlGroup;
    id: Control;
    name: Control;
    yearFrom: Control;
    yearTo: Control;
    competition_id: Control;

    constructor(
        private _fb: FormBuilder,
        private _routeParams: RouteParams,
        private _router: Router,
        private _categoryService: CategoryService
    ) {
        let id = +this._routeParams.get('id');

        this._categoryService
            .getCategory(id)
            .subscribe(res => {
                 this.category = res;

                 this.id = new Control(this.category.id, Validators.required);
                 this.name = new Control(this.category.name, Validators.required);
                 this.yearFrom = new Control(this.category.yearFrom.toString(), Validators.required);
                 this.yearTo = new Control(this.category.yearTo.toString(), Validators.required);
                 this.competition_id = new Control('12', Validators.required);

                 this.form = this._fb.group({
                     id: this.id,
                     name: this.name,
                     yearFrom: this.yearFrom,
                     yearTo: this.yearTo,
                     competition_id: this.competition_id
                 });
            });
    }

    onSubmit() {
        this._categoryService.saveCategory(this.form.value).subscribe(res => console.log(res));
    }
}
