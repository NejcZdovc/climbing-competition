import { NgModule } from '@angular/core';

import { RouteRoutingModule } from './route-routing.module';
import { RouteAddComponent } from './route-add/route-add.component';
import { RouteEditComponent } from './route-edit/route-edit.component';
import {GeneralModule} from '../general/general.module';
import { RouteFormComponent } from './route-form/route-form.component';

@NgModule({
  imports: [
    GeneralModule,
    RouteRoutingModule
  ],
  declarations: [
    RouteFormComponent,
    RouteAddComponent,
    RouteEditComponent
  ]
})
export class RouteModule { }
