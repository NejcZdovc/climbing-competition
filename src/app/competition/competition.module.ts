import { NgModule } from '@angular/core';

import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionHomeComponent } from './competition-home/competition-home.component';
import { CompetitionAddComponent } from './competition-add/competition-add.component';
import { CompetitionEditComponent } from './competition-edit/competition-edit.component';
import {GeneralModule} from '../general/general.module';
import { CompetitionFormComponent } from './competition-form/competition-form.component';

@NgModule({
  imports: [
    GeneralModule,
    CompetitionRoutingModule
  ],
  declarations: [
    CompetitionFormComponent,
    CompetitionHomeComponent,
    CompetitionAddComponent,
    CompetitionEditComponent
  ]
})
export class CompetitionModule { }
