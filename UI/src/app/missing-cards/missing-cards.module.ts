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
} from '@angular/material';

import {
  missingCardsRoutes
} from './missing-cards.routing';

import {
  MissingCardsPageInitializationGuard,
  MISSING_CARDS_FEATURE_NAME,
  MissingCardsPageComponent,
  MissingCardsPageEffects,
  missingCardsPageReducer,
} from './missing-cards-page';
import {
  INVENTORY_FEATURE_NAME,
  InventoryComponent,
  InventoryEffects,
  inventoryReducer,
} from './missing-cards-page/inventory';

const matModules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
];

const components = [
  MissingCardsPageComponent,
  InventoryComponent,
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
