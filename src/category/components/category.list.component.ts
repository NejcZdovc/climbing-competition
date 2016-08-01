import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import 'rxjs/add/operator/map';

import {Category} from './category';
import {CategoryService} from '../../shared/services/category.service';

@Component({
    selector: 'cc-category-list',
    moduleId: module.id,
    templateUrl: './category.list.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers:  [CategoryService]
})

export class CategoryListComponent {
    categories: Category[];

    constructor(private _router: Router, private _categoryService: CategoryService) {
        this._categoryService.getCategories().subscribe(res => this.categories = res);
    }

    goToDetail(cat: Category) {
        this._router.navigate(['CategoryDetail', { id: cat.id }]);
    }
}
