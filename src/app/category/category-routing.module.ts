import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {CategoryAddComponent} from './category-add/category-add.component';
import {CompetitionGuard} from '../general/competition-guard.service';
import {CategoryDetailsComponent} from './category-details/category-details.component';


const routes: Routes = [
  {
    path: 'category/list',
    canActivate: [CompetitionGuard],
    component: CategoryListComponent
  },
  {
    path: 'category/add',
    canActivate: [CompetitionGuard],
    component: CategoryAddComponent
  },
  {
    path: 'category/edit/:id',
    canActivate: [CompetitionGuard],
    component: CategoryEditComponent
  },
  {
    path: 'category/details/:id',
    canActivate: [CompetitionGuard],
    component: CategoryDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
