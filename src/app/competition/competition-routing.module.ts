import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompetitionHomeComponent} from './competition-home/competition-home.component';
import {CompetitionAddComponent} from './competition-add/competition-add.component';
import {CompetitionEditComponent} from './competition-edit/competition-edit.component';

const routes: Routes = [
  {
    path: 'competition/welcome',
    component: CompetitionHomeComponent
  },
  {
    path: 'competition/add',
    component: CompetitionAddComponent
  },
  {
    path: 'competition/edit/:id',
    component: CompetitionEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitionRoutingModule { }
