import { NgModule } from '@angular/core';

import { ResultRoutingModule } from './result-routing.module';
import { ResultListComponent } from './result-list/result-list.component';
import {GeneralModule} from '../general/general.module';

@NgModule({
  imports: [
    GeneralModule,
    ResultRoutingModule
  ],
  declarations: [ResultListComponent]
})
export class ResultModule { }
