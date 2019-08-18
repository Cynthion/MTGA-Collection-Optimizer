import { RootState } from '../../app.state';

import { DecksTabState, initialDecksTabState } from './decks-tab';

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
