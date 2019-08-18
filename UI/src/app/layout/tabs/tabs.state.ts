import { RootState } from '../../app.state';

import {
  PlayerCardState,
  DeckCardState,
  DeckCardDto,
} from '../../domain.state';

import { DecksState } from './decks/decks.state';

export const TABS_FEATURE_NAME: keyof TabsFeatureState = 'tabs';

export interface TabsFeatureState extends RootState {
  tabs: TabsState;
}

export interface TabsState {
  decks: DecksState;
}

export interface CollectionCardState extends PlayerCardState, DeckCardState {
  missingCount: number;
  wildcardWorthinessFactor: number;
}
