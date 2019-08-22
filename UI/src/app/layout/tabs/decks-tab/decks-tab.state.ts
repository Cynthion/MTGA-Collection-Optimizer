import { TabsState } from '../tabs.state';

export enum SortDeckColumnOrder {
  Alphabetical,
  Completeness,
}

export const DECKS_TAB_MODULE_FEATURE_NAME: keyof TabsState = 'decksTab';

export interface DecksTabState {
  sortDeckColumnOrder: SortDeckColumnOrder;
}

export const initialDecksTabState: DecksTabState = {
  sortDeckColumnOrder: SortDeckColumnOrder.Completeness,
};
