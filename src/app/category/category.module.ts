import { NgModule } from '@angular/core';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import {CategoryRoutingModule} from './category-routing.module';
import {GeneralModule} from '../general/general.module';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
  imports: [
    GeneralModule,
    CategoryRoutingModule
  ],
  declarations: [
    CategoryFormComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryListComponent,
    CategoryDetailsComponent
  ]
})
export class CategoryModule { }
