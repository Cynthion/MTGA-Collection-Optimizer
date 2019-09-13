export enum Rarity {
  Unknown = -1,
  Type = 0,
  Land = 1,
  Common = 2,
  Uncommon = 3,
  Rare = 4,
  MythicRare = 5,
}

export enum Color {
  White = 1,
  Blue = 2,
  Black = 3,
  Red = 4,
  Green = 5,
}

export enum CardType {
  Unknown = -1,
  Artifact = 1,
  Creature = 2,
  Enchantment = 3,
  Instant = 4,
  Land = 5,
  Phenomenon = 6,
  Plane = 7,
  Planeswalker = 8,
  Scheme = 9,
  Sorcery = 10,
  Tribal = 11,
  Vanguard = 12,
}

// export interface CardDto {
//   mtgaId: number;
// }

// export interface CardState extends CardDto {
//   name: string;
//   rarity: Rarity;
//   setCode: string;
// }

// export interface PlayerCardDto extends CardDto {
//   ownedCount: number;
// }

// export interface PlayerCardState extends PlayerCardDto, CardState {

// }

// export interface DeckCardDto extends CardDto {
//   requiredCount: number;
// }

// export interface DeckCardState extends DeckCardDto, CardState {

// }

// export interface PlayerDeckDto {
//   id: string;
//   name: string;
//   cards: DeckCardDto[];
// }

// export interface PlayerDeckState extends PlayerDeckDto {
//   cards: DeckCardState[];
//   totalOwnedDeckCards: number;
//   totalDeckCards: number;
//   completeness: number;
// }

// export const initialPlayerCardState: PlayerCardState = {
//   mtgaId: 0,
//   name: '',
//   rarity: Rarity.Unknown,
//   setCode: '',
//   ownedCount: 0,
// };

// export const initialDeckCardState: DeckCardState = {
//   mtgaId: 0,
//   name: '',
//   rarity: Rarity.Unknown,
//   setCode: '',
//   requiredCount: 0,
// };

// export const initialPlayerDeckState: PlayerDeckState = {
//   id: '',
//   name: '',
//   cards: [initialDeckCardState],
//   totalOwnedDeckCards: 0,
//   totalDeckCards: 0,
//   completeness: 0,
// };
