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

import { LayoutRoutingModule } from './layout-routing.module';

import { LayoutInitializationGuard } from './layout.guard';
import { LAYOUT_FEATURE_NAME } from './layout.state';
import { layoutReducer } from './layout.reducer';
import { LayoutComponent } from './layout.component';
import { InventoryComponent } from './inventory';
import { TabsComponent } from './tabs';

// TODO remove once lazy loaded
// import { DecksTabModule } from './tabs/decks-tab/decks-tab.module';
// import { HistoryTabModule } from './tabs/history-tab/history-tab.module';

const matModules = [
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
    LayoutComponent,
    InventoryComponent,
    TabsComponent,
  ];

  const effects = [
  ];

@NgModule({
    declarations: [
      ...components,
    ],
    imports: [
      LayoutRoutingModule,
      CommonModule,
      FormsModule,
      StoreModule.forFeature(LAYOUT_FEATURE_NAME, layoutReducer),
      EffectsModule.forFeature(effects),
      ...matModules,
      // DecksTabModule,
      // HistoryTabModule,
    ],
    providers: [LayoutInitializationGuard],
  })
  export class LayoutModule { }
