import { AppState } from 'src/app/app.state';

export const MISSING_CARDS_FEATURE_NAME: keyof MissingCardsFeatureState = 'missingCardsPage';

export interface MissingCardsFeatureState extends AppState {
  missingCardsPage: MissingCardsPageState;
}

export const rarityDictionary: { [rarity: string]: number } = {
  'Basic Land': 0,
  Basic: 0,
  Common: 1,
  Uncommon: 2,
  Rare: 3,
  'Mythic Rare': 4,
};

export interface CardDto {
  multiverseId: number;
}

export interface CardState extends CardDto {
  name: string;
  rarity: number;
  setCode: string;
}


export interface PlayerCardDto extends CardDto {
  ownedCount: number;
}

export interface PlayerCardState extends PlayerCardDto, CardState {

}

export interface CollectionCardState extends PlayerCardState {
  missingCount: number;
}

export interface DeckCardDto extends CardDto {
  requiredCount: number;
}

export interface DeckCardState extends DeckCardDto, CardState {

}

export interface PlayerDeckDto {
  id: string;
  name: string;
  cards: DeckCardDto[];
}

export interface PlayerDeckState extends PlayerDeckDto {
  cards: DeckCardState[];
}

export interface MissingCardsPageDto {
  playerDecks: PlayerDeckDto[];
  playerCards: PlayerCardDto[];
}

export interface MissingCardsPageState extends MissingCardsPageDto {
  playerDecks: PlayerDeckState[];
  playerCards: PlayerCardState[];
  collectionCards: CollectionCardState[];
}

export const initialMissingCardsPageState: MissingCardsPageState = {
  playerDecks: [],
  playerCards: [],
  collectionCards: [],
};
