import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { WrapComponent } from './wrap/wrap.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule, MatIconModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatabaseService} from '../providers/database.service';
import {CompetitionService} from '../providers/competition.service';
import {CompetitionGuard} from './competition-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    HeaderComponent,
    WrapComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [
    DatabaseService,
    CompetitionService,
    CompetitionGuard
  ],
  declarations: [HeaderComponent, WrapComponent]
})
export class GeneralModule { }
