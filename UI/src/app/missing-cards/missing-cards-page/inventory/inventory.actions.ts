import { Action } from '@ngrx/store';

import { InventoryDto, WildcardRequirementsState } from './inventory.state';

export enum InventoryActionTypes {
  Load = '[Inventory] Load',
  Initialized = '[Inventory] Initialized',
  UnknownCardsUpdated = '[Inventory] Unknown Cards Updated',
  WildcardRequirementsUpdated = '[Inventory] Wildcard Requirements Updated',
}

export class LoadInventoryAction implements Action {
  readonly type = InventoryActionTypes.Load;
}

export class InitializedInventoryAction implements Action {
  readonly type = InventoryActionTypes.Initialized;

  constructor(
    public dto: InventoryDto,
  ) { }
}

export class UnknownCardsUpdatedAction implements Action {
  readonly type = InventoryActionTypes.UnknownCardsUpdated;

  constructor(
    public nrOfUnknownCards: number,
  ) { }
}

export class WildcardRequirementsUpdatedAction implements Action {
  readonly type = InventoryActionTypes.WildcardRequirementsUpdated;

  constructor(
    public wildcardRequirementsState: WildcardRequirementsState,
  ) { }
}

export type InventoryActions =
  | LoadInventoryAction
  | InitializedInventoryAction
  | UnknownCardsUpdatedAction
  | WildcardRequirementsUpdatedAction
  ;
