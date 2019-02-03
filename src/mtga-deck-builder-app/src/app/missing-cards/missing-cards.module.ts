import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import {
  MatInputModule,
  MatPaginatorModule,
  MatTableModule,
} from '@angular/material';

import { missingCardsRoutes } from './missing-cards.routing';

import {
  MISSING_CARDS_PAGE_STATE_FEATURE_NAME,
  MissingCardsPageInitializationGuard,
  MissingCardsPageComponent,
  MissingCardsPageEffects,
  missingCardsPageReducer,
} from './missing-cards-page';

const matModules = [
  MatInputModule,
  MatPaginatorModule,
  MatTableModule,
];

@NgModule({
  declarations: [
    MissingCardsPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(missingCardsRoutes),
    EffectsModule.forFeature([
      MissingCardsPageEffects,
    ]),
    StoreModule.forFeature(MISSING_CARDS_PAGE_STATE_FEATURE_NAME, missingCardsPageReducer),
    ...matModules,
  ],
  providers: [MissingCardsPageInitializationGuard],
})
export class MissingCardsModule { }
