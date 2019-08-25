import { Action } from '@ngrx/store';

import { InventoryDto, WildcardRequirementsState } from './inventory.state';

export enum InventoryActionTypes {
  Initialize = '[Inventory] Initialize',
  UnknownCardsUpdated = '[Inventory] Unknown Cards Updated',
  WildcardRequirementsUpdated = '[Inventory] Wildcard Requirements Updated',
}

export class InitializeInventoryAction implements Action {
  readonly type = InventoryActionTypes.Initialize;

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
  | InitializeInventoryAction
  | UnknownCardsUpdatedAction
  | WildcardRequirementsUpdatedAction
  ;
