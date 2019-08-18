import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

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

import {
  tabsRoutes,
} from './tabs.routing';

import {
  INVENTORY_FEATURE_NAME,
  InventoryComponent,
  InventoryEffects,
  inventoryReducer,
} from '../inventory';

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
  InventoryComponent,
  DecksComponent,
  MissingCardsPageComponent,
];

const effects = [
  MissingCardsPageEffects,
  InventoryEffects,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(missingCardsRoutes),
    StoreModule.forFeature(MISSING_CARDS_FEATURE_NAME, missingCardsPageReducer),
    StoreModule.forFeature(INVENTORY_FEATURE_NAME, inventoryReducer),
    EffectsModule.forFeature(effects),
    ...matModules,
  ],
  providers: [MissingCardsPageInitializationGuard],
})
export class MissingCardsModule { }
