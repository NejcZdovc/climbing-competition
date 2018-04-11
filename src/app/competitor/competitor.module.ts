import { NgModule } from '@angular/core';

import { CompetitorRoutingModule } from './competitor-routing.module';
import { CompetitorAddComponent } from './competitor-add/competitor-add.component';
import { CompetitorEditComponent } from './competitor-edit/competitor-edit.component';
import {GeneralModule} from '../general/general.module';
import { CompetitorFormComponent } from './competitor-form/competitor-form.component';

@NgModule({
  imports: [
    GeneralModule,
    CompetitorRoutingModule
  ],
  declarations: [CompetitorAddComponent, CompetitorEditComponent, CompetitorFormComponent]
})
export class CompetitorModule { }
