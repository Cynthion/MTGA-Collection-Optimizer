import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HistoryTabRoutingModule } from './history-tab-routing.module';

import { HISTORY_TAB_MODULE_FEATURE_NAME } from './history-tab.state';
import { historyTabReducer } from './history-tab.reducer';
import { HistoryTabComponent } from './history-tab.component';

const matModules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
];

const components = [
  HistoryTabComponent,
];

const effects = [

];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    HistoryTabRoutingModule,
    CommonModule,
    FormsModule,
    StoreModule.forFeature(HISTORY_TAB_MODULE_FEATURE_NAME, historyTabReducer),
    EffectsModule.forFeature(effects),
    ...matModules,
  ],
  providers: [],
})
export class HistoryTabModule { }
