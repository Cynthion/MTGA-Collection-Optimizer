import { RootState } from '../../app.state';

export const MISSING_CARDS_FEATURE_NAME: keyof MissingCardsFeatureState = 'missingCardsPage';

export interface MissingCardsFeatureState extends RootState {
  missingCardsPage: MissingCardsPageState;
}

export enum Rarity {
  Unknown = -1,
  'Basic Land' = 0,
  Basic = 0,
  Common = 1,
  Uncommon = 2,
  Rare = 3,
  'Mythic Rare' = 4,
}

export enum SortDeckColumnOrder {
  Alphabetical,
  Completeness,
}

export interface CardDto {
  mtgaId: number;
}

export interface CardState extends CardDto {
  name: string;
  rarity: Rarity;
  setCode: string;
}

export interface PlayerCardDto extends CardDto {
  ownedCount: number;
}

export interface PlayerCardState extends PlayerCardDto, CardState {

}

export interface DeckCardDto extends CardDto {
  requiredCount: number;
}

export interface DeckCardState extends DeckCardDto, CardState {

}

export interface CollectionCardState extends PlayerCardState, DeckCardState {
  missingCount: number;
  missingCountOverAllDecks: number;
}

export interface PlayerDeckDto {
  id: string;
  name: string;
  cards: DeckCardDto[];
}

export interface PlayerDeckState extends PlayerDeckDto {
  cards: DeckCardState[];
  totalOwnedCards: number;
  totalDeckCards: number;
  completeness: number;
}

export interface MissingCardsPageDto {
  playerDecks: PlayerDeckDto[];
  playerCards: PlayerCardDto[];
}

export interface MissingCardsPageState extends MissingCardsPageDto {
  playerDecks: PlayerDeckState[];
  playerCards: PlayerCardState[];
  collectionCards: CollectionCardState[];
  sortDeckColumnOrder: SortDeckColumnOrder;
  nrOfUnknownCards: number;
}

export const initialMissingCardsPageState: MissingCardsPageState = {
  playerDecks: [],
  playerCards: [],
  collectionCards: [],
  sortDeckColumnOrder: SortDeckColumnOrder.Completeness,
  nrOfUnknownCards: 0,
};
