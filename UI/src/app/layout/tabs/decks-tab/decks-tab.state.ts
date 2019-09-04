import { State as ParentState } from '../tabs.state';

export enum SortDeckColumnOrder {
  Alphabetical,
  Completeness,
  Incompleteness,
}

export const DECKS_TAB_MODULE_FEATURE_NAME: keyof State = 'decksTab';

export interface State extends ParentState {
  decksTab: DecksTabState;
}

export interface DecksTabState {
  sortDeckColumnOrder: SortDeckColumnOrder;
}

export const initialDecksTabState: DecksTabState = {
  sortDeckColumnOrder: SortDeckColumnOrder.Incompleteness,
};
