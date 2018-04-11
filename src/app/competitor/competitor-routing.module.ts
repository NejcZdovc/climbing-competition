import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryGuard} from '../general/category-guard.service';
import {CompetitorAddComponent} from './competitor-add/competitor-add.component';
import {CompetitorEditComponent} from './competitor-edit/competitor-edit.component';

const routes: Routes = [
  {
    path: 'competitor/add',
    canActivate: [CategoryGuard],
    component: CompetitorAddComponent
  },
  {
    path: 'competitor/edit/:id',
    canActivate: [CategoryGuard],
    component: CompetitorEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitorRoutingModule { }
