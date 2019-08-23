import { TabsState as RootState } from '../tabs.state';

export enum SortDeckColumnOrder {
  Alphabetical,
  Completeness,
}

export const DECKS_TAB_MODULE_FEATURE_NAME: keyof State = 'decksTab';

export interface State extends RootState {
  decksTab: DecksTabState;
}

export interface DecksTabState {
  sortDeckColumnOrder: SortDeckColumnOrder;
}

export const initialDecksTabState: DecksTabState = {
  sortDeckColumnOrder: SortDeckColumnOrder.Completeness,
};
