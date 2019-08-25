import { RootState as ParentState } from '../app.state';
import { PlayerCardState, PlayerDeckState, PlayerCardDto, PlayerDeckDto, initialPlayerCardState, initialPlayerDeckState, DeckCardState } from '../domain.state';

import { initialInventoryState, InventoryState, InventoryDto } from './inventory';
import { TabsState, initialTabsState } from './tabs/tabs.state';

export const LAYOUT_FEATURE_NAME: keyof State = 'layout';

export interface State extends ParentState {
  layout: LayoutState;
}

export interface CollectionCardState extends PlayerCardState, DeckCardState {
  missingCount: number;
  wildcardWorthinessFactor: number;
}

export interface LayoutDto {
  inventory: InventoryDto;
  playerCards: PlayerCardDto[];
  playerDecks: PlayerDeckDto[];
}

export interface LayoutState extends LayoutDto {
  inventory: InventoryState;
  playerCards: PlayerCardState[];
  playerDecks: PlayerDeckState[];
  collectionCards: CollectionCardState[];
  tabs: TabsState;
}

export const initialLayoutState: LayoutState = {
  inventory: initialInventoryState,
  playerCards: [initialPlayerCardState],
  playerDecks: [initialPlayerDeckState],
  collectionCards: [],
  tabs: initialTabsState,
};
