import { Action } from '@ngrx/store';

import { InventoryDto, WildcardRequirementsState } from './inventory.state';

export enum InventoryActionTypes {
  Load = '[Inventory] Load',
  Initialized = '[Inventory] Initialized',
  LoadError = '[Inventory] Load Error',
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

// TODO not used yet
export class LoadInventoryErrorAction implements Action {
  readonly type = InventoryActionTypes.LoadError;
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
  | LoadInventoryErrorAction
  | WildcardRequirementsUpdatedAction
  ;
