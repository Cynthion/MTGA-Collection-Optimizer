import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { missingCardsRoutes } from './missing-cards.routing';

import {
  MissingCardsPageComponent,
  MissingCardsPageEffects,
} from './missing-cards-page';


@NgModule({
  declarations: [
    MissingCardsPageComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(missingCardsRoutes),
    EffectsModule.forFeature([
      MissingCardsPageEffects,
    ]),
    StoreModule.forFeature(PROPOSAL_LIST_PAGE_STATE_FEATURE_NAME, proposalListPageReducer),
    ...matModules,
  ],
  providers: [],
})
export class MissingCardsModule { }
