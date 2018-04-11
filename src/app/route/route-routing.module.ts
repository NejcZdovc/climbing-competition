import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryGuard} from '../general/category-guard.service';
import {RouteAddComponent} from './route-add/route-add.component';
import {RouteEditComponent} from './route-edit/route-edit.component';

const routes: Routes = [
  {
    path: 'route/add',
    canActivate: [CategoryGuard],
    component: RouteAddComponent
  },
  {
    path: 'route/edit/:id',
    canActivate: [CategoryGuard],
    component: RouteEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
