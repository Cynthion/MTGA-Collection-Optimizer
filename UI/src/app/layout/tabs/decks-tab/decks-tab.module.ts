import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
  } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DecksTabRoutingModule } from './decks-tab-routing.module';

import { DECKS_TAB_MODULE_FEATURE_NAME as DECKS_TAB_FEATURE_NAME } from './decks-tab.state';
import { decksTabReducer } from './decks-tab.reducer';
import { DecksTabComponent } from './decks-tab.component';

const matModules = [ // TODO all required?
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
];

const components = [
  DecksTabComponent,
];

const effects = [

];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    DecksTabRoutingModule,
    CommonModule,
    FormsModule,
    StoreModule.forFeature(DECKS_TAB_FEATURE_NAME, decksTabReducer),
    EffectsModule.forFeature(effects),
    ...matModules,
  ],
  providers: [],
})
export class DecksTabModule { }