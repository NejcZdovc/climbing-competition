import { NgModule } from '@angular/core';

import { RouteRoutingModule } from './route-routing.module';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteAddComponent } from './route-add/route-add.component';
import { RouteEditComponent } from './route-edit/route-edit.component';
import {GeneralModule} from '../general/general.module';

@NgModule({
  imports: [
    GeneralModule,
    RouteRoutingModule
  ],
  declarations: [RouteListComponent, RouteAddComponent, RouteEditComponent]
})
export class RouteModule { }
