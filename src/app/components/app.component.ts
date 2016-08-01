import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {NavbarComponent} from './navbar.component';

import {CategoryAddComponent} from '../../category/components/category.add.component';
import {CategoryEditComponent} from '../../category/components/category.edit.component';
import {CategoryDetailComponent} from '../../category/components/category.detail.component';
import {CategoryListComponent} from '../../category/components/category.list.component';

import {RouteAddComponent} from '../../route/components/route.add.component';
import {RouteEditComponent} from '../../route/components/route.edit.component';

import {CompetitorAddComponent} from '../../competitor/components/competitor.add.component';
import {CompetitorEditComponent} from '../../competitor/components/competitor.edit.component';

import {ResultListComponent} from '../../result/components/result.list.component';

@Component({
    selector: 'main-app',
    moduleId: module.id,
    templateUrl: './app.component.html',
    directives: [ROUTER_DIRECTIVES, NavbarComponent]
})
@RouteConfig([
    {
        path: '/categories',
        name: 'Categories',
        component: CategoryListComponent,
        useAsDefault: true
    },
    {
        path: '/category/add',
        name: 'CategoryAdd',
        component: CategoryAddComponent
    },
    {
        path: '/category/edit/:id',
        name: 'CategoryEdit',
        component: CategoryEditComponent
    },
    {
        path: '/category/detail/:id',
        name: 'CategoryDetail',
        component: CategoryDetailComponent
    },
    {
        path: '/route/add',
        name: 'RouteAdd',
        component: RouteAddComponent
    },
    {
        path: '/route/edit/:id',
        name: 'RouteEdit',
        component: RouteEditComponent
    },
    {
        path: '/competitor/add',
        name: 'CompetitorAdd',
        component: CompetitorAddComponent
    },
    {
        path: '/competitor/edit/:id',
        name: 'CompetitorEdit',
        component: CompetitorEditComponent
    },
    {
        path: '/result/view/:id',
        name: 'ResultList',
        component: ResultListComponent
    },
])

export class AppComponent {}
