import { NgModule } from '@angular/core';

import { CompetitorRoutingModule } from './competitor-routing.module';
import { CompetitorAddComponent } from './competitor-add/competitor-add.component';
import { CompetitorEditComponent } from './competitor-edit/competitor-edit.component';
import { CompetitorListComponent } from './competitor-list/competitor-list.component';
import {GeneralModule} from '../general/general.module';

@NgModule({
  imports: [
    GeneralModule,
    CompetitorRoutingModule
  ],
  declarations: [CompetitorAddComponent, CompetitorEditComponent, CompetitorListComponent]
})
export class CompetitorModule { }
