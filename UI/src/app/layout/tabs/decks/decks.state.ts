import {
  PlayerCardState,
  PlayerCardDto,
  PlayerDeckDto,
  PlayerDeckState,
} from '../../../domain.state';
import { CollectionCardState } from '../tabs.state';

export enum SortDeckColumnOrder {
  Alphabetical,
  Completeness,
}

export interface DecksDto {
  playerCards: PlayerCardDto[];
  playerDecks: PlayerDeckDto[];
}

export interface DecksState extends DecksDto {
  playerCards: PlayerCardState[];
  playerDecks: PlayerDeckState[];
  collectionCards: CollectionCardState[];
  sortDeckColumnOrder: SortDeckColumnOrder;
}

export const initialDecksState: DecksState = {
  playerCards: [],
  playerDecks: [],
  collectionCards: [],
  sortDeckColumnOrder: SortDeckColumnOrder.Completeness,
};
