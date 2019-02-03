import { RootState as AppRootState } from '../../app.state';

export const MISSING_CARDS_PAGE_STATE_FEATURE_NAME: keyof RootState = 'missingCardsPage';

export interface RootState extends AppRootState {
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

export interface PlayerDeckDto {
  id: string;
  name: string;
  cards: CardDto[];
}

export interface PlayerDeckState extends PlayerDeckDto {
  cards: CardState[];
}

export interface CardDto {
  multiverseId: number;
  quantity: number;
}

export interface CardState extends CardDto {
  name: string;
  rarity: number;
  setCode: string;
}

export interface MissingCardsPageDto {
  playerDecks: PlayerDeckDto[];
  playerCards: CardDto[];
}

export interface MissingCardsPageState extends MissingCardsPageDto {
  playerDecks: PlayerDeckState[];
  playerCards: CardState[];
  allCards: CardState[];
}

export const initialMissingCardsPageState: MissingCardsPageState = {
  playerDecks: [],
  playerCards: [],
  allCards: [],
};
