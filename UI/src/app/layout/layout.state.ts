import { RootState as ParentState } from '../app.state';
import { Rarity, CardType, Color } from '../domain.state';

import { initialInventoryState, InventoryState, InventoryDto } from './inventory';
import { TabsState, initialTabsState } from './tabs/tabs.state';
import { HistoryCardDto, HistoryCardState } from './tabs/history-tab/history-tab.state';

export const LAYOUT_FEATURE_NAME: keyof State = 'layout';

export interface State extends ParentState {
  layout: LayoutState;
}

export interface GameCard {
  grpId: number;
  name: string;
  cardTypeText: string;
  subtypeText: string;
  set: string;
  power: number;
  toughness: number;
  rarity: Rarity;
  colors: Color[];
  cardTypes: CardType[];
  subtypes: string[];
  abilities: string[];
  hiddenAbilities: string[];
}

export interface DeckRequirementDto {
  deckName: string;
  ownedCount: number;
  requiredCount: number;
}

export interface DeckRequirementState extends DeckRequirementDto {

}

export interface CollectionCardDto {
  mtgaId: number;
  ownedCount: number;
  requiredCount: number;
  missingCount: number;
  wildcardWorthiness: number;
  deckRequirements: DeckRequirementDto[];
  data: GameCard;
}

export interface CollectionCardState extends CollectionCardDto {
  deckRequirements: DeckRequirementState[];
}

export interface DeckCardDto {
  mtgaId: number;
  requiredCount: number;
}

export interface DeckCardState extends DeckCardDto {

}

export interface PlayerDeckDto {
  id: string;
  name: string;
  cards: DeckCardDto[];
  totalOwnedDeckCards: number;
  totalDeckCards: number;
  completeness: number;
  worth: number;
}

export interface PlayerDeckState extends PlayerDeckDto {
  cards: DeckCardState[];
}

export interface LayoutDto {
  inventory: InventoryDto;
  collectionCards: CollectionCardDto[];
  decks: PlayerDeckDto[];
  historyCards: HistoryCardDto[];
}

export interface LayoutState extends LayoutDto {
  inventory: InventoryState;
  collectionCards: CollectionCardState[];
  decks: PlayerDeckState[];
  tabs: TabsState; // TODO should this be here with the backend stuff?
  historyCards: HistoryCardState[];
}

export const initialLayoutState: LayoutState = {
  inventory: initialInventoryState,
  collectionCards: [],
  decks: [],
  tabs: initialTabsState,
  historyCards: [],
};
