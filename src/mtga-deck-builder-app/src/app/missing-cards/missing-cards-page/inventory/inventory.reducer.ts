import { initialInventoryState, InventoryState } from './inventory.state';
import { InventoryActions, InventoryActionTypes } from './inventory.actions';

export function inventoryReducer(state = initialInventoryState, action: InventoryActions): InventoryState {
  switch (action.type) {

    case InventoryActionTypes.Initialized: {
      return {
        ...state,
        ...action.dto,
      };
    }

    default: {
      return state;
    }
  }
}
