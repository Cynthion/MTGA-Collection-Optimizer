import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { missingCardsRoutes } from './missing-cards.routing';

import {
  MISSING_CARDS_PAGE_STATE_FEATURE_NAME,
  MissingCardsPageComponent,
  MissingCardsPageEffects,
  missingCardsPageReducer,
} from './missing-cards-page';

@NgModule({
  declarations: [
    MissingCardsPageComponent,
  ],
  imports: [
    RouterModule.forChild(missingCardsRoutes),
    EffectsModule.forFeature([
      MissingCardsPageEffects,
    ]),
    StoreModule.forFeature(MISSING_CARDS_PAGE_STATE_FEATURE_NAME, missingCardsPageReducer),
  ],
  providers: [],
})
export class MissingCardsModule { }
