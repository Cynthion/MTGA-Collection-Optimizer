import { RootState } from '../app.state';
import { PlayerCardState, PlayerDeckState, PlayerCardDto, PlayerDeckDto, initialPlayerCardState, initialPlayerDeckState, DeckCardState } from '../domain.state';

import { initialInventoryState, InventoryState } from './inventory';
import { TabsState, initialTabsState } from './tabs/tabs.state';

export const LAYOUT_FEATURE_NAME: keyof LayoutFeatureState = 'layout';

export interface LayoutFeatureState extends RootState {
  layout: LayoutState;
}

export interface CollectionCardState extends PlayerCardState, DeckCardState {
  missingCount: number;
  wildcardWorthinessFactor: number;
}

export interface LayoutDto {
  playerCards: PlayerCardDto[];
  playerDecks: PlayerDeckDto[];
}

export interface LayoutState extends LayoutDto {
  playerCards: PlayerCardState[];
  playerDecks: PlayerDeckState[];
  collectionCards: CollectionCardState[];
  inventory: InventoryState;
  tabs: TabsState;
}

export const initialLayoutState: LayoutState = {
  playerCards: [initialPlayerCardState],
  playerDecks: [initialPlayerDeckState],
  collectionCards: [],
  inventory: initialInventoryState,
  tabs: initialTabsState,
};
