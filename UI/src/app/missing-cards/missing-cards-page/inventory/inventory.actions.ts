import { Action } from '@ngrx/store';
import { InventoryDto } from './inventory.state';

export enum InventoryActionTypes {
  Load = '[Inventory] Load',
  Initialized = '[Inventory] Initialized',
  LoadError = '[Inventory] Load Error',
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

export class LoadInventoryErrorAction implements Action {
  readonly type = InventoryActionTypes.LoadError;
}

export type InventoryActions =
  | LoadInventoryAction
  | InitializedInventoryAction
  | LoadInventoryErrorAction
  ;
