export enum Rarity {
  Unknown = -1,
  'Basic Land' = 0,
  Basic = 0,
  Common = 1,
  Uncommon = 2,
  Rare = 3,
  'Mythic Rare' = 4,
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

export const initialPlayerCardState: PlayerCardState = {
  mtgaId: 0,
  name: '',
  rarity: Rarity.Unknown,
  setCode: '',
  ownedCount: 0,
};

export const initialDeckCardState: DeckCardState = {
  mtgaId: 0,
  name: '',
  rarity: Rarity.Unknown,
  setCode: '',
  requiredCount: 0,
};

export const initialPlayerDeckState: PlayerDeckState = {
  id: '',
  name: '',
  cards: [initialDeckCardState],
  totalOwnedCards: 0,
  totalDeckCards: 0,
  completeness: 0,
};
