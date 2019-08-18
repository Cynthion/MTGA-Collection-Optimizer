import {
  PlayerCardState,
  PlayerCardDto,
  PlayerDeckDto,
  PlayerDeckState,
  initialPlayerCardState,
  initialPlayerDeckState,
} from '../../../domain.state';
import { CollectionCardState } from '../tabs.state';

export enum SortDeckColumnOrder {
  Alphabetical,
  Completeness,
}

export interface DecksTabDto {
  playerCards: PlayerCardDto[];
  playerDecks: PlayerDeckDto[];
}

export interface DecksTabState extends DecksTabDto {
  playerCards: PlayerCardState[];
  playerDecks: PlayerDeckState[];
  collectionCards: CollectionCardState[];
  sortDeckColumnOrder: SortDeckColumnOrder;
}

export const initialDecksTabState: DecksTabState = {
  playerCards: [initialPlayerCardState],
  playerDecks: [initialPlayerDeckState],
  collectionCards: [],
  sortDeckColumnOrder: SortDeckColumnOrder.Completeness,
};
