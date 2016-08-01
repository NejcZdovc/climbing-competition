import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';
import 'rxjs/add/operator/map';

import {CategoryService} from '../../shared/services/category.service';

@Component({
    selector: 'cc-category-add',
    moduleId: module.id,
    templateUrl: './category.add.component.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers:  [CategoryService]
})

export class CategoryAddComponent {
    form: ControlGroup;
    name: Control;
    yearFrom: Control;
    yearTo: Control;
    competition_id: Control;

    constructor(private _fb: FormBuilder,  private _categoryService: CategoryService) {
        this.name = new Control('', Validators.required);
        this.yearFrom = new Control('', Validators.required);
        this.yearTo = new Control('', Validators.required);
        this.competition_id = new Control('12', Validators.required);

        this.form = _fb.group({
            name: this.name,
            yearFrom: this.yearFrom,
            yearTo: this.yearTo,
            competition_id: this.competition_id
        });
    }

    onSubmit() {
        this._categoryService.createCategory(this.form.value).subscribe(res => console.log(res));
    }
}
