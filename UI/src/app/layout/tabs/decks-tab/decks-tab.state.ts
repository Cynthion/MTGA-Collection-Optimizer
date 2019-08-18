export enum SortDeckColumnOrder {
  Alphabetical,
  Completeness,
}

export interface DecksTabState {
  sortDeckColumnOrder: SortDeckColumnOrder;
}

export const initialDecksTabState: DecksTabState = {
  sortDeckColumnOrder: SortDeckColumnOrder.Completeness,
};
