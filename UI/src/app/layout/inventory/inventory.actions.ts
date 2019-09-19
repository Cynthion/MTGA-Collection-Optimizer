import { Action } from '@ngrx/store';

import { InventoryDto } from './inventory.state';

export enum InventoryActionTypes {
  Initialize = '[Inventory] Initialize',
}

export class InitializeInventoryAction implements Action {
  readonly type = InventoryActionTypes.Initialize;

  constructor(
    public dto: InventoryDto,
  ) { }
}

export type InventoryActions =
  | InitializeInventoryAction
  ;
