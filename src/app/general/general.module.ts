import { NgModule } from '@angular/core';
import { WrapComponent } from './wrap/wrap.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatIconModule,
  MatDividerModule,
  MatTableModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatabaseService} from '../providers/database.service';
import {StoreService} from '../providers/store.service';
import {CompetitionGuard} from './competition-guard.service';
import {CategoryGuard} from './category-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    WrapComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule
  ],
  providers: [
    DatabaseService,
    StoreService,
    CompetitionGuard,
    CategoryGuard
  ],
  declarations: [WrapComponent]
})
export class GeneralModule { }
