import { RootState } from '../../app.state';

import {
  PlayerCardState,
  DeckCardState,
  DeckCardDto,
} from '../../domain.state';

import { DecksTabState, initialDecksTabState } from './decks/decks.state';

export const TABS_FEATURE_NAME: keyof TabsFeatureState = 'tabs';

export interface TabsFeatureState extends RootState {
  tabs: TabsState;
}

export interface TabsState {
  decksTab: DecksTabState;
}

export const initialTabsState: TabsState = {
  decksTab: initialDecksTabState,
};

export interface CollectionCardState extends PlayerCardState, DeckCardState {
  missingCount: number;
  wildcardWorthinessFactor: number;
}
