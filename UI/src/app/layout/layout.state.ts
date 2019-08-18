import { RootState } from '../app.state';

import { initialInventoryState } from './inventory';

export const LAYOUT_FEATURE_NAME: keyof LayoutFeatureState = 'layout';

export interface LayoutFeatureState extends RootState {
  layout: LayoutState;
}

export interface LayoutState {
  inventory: InventoryState;
  tabs: TabsState;
}

export const initialLayoutState: LayoutState = {
  inventory: initialInventoryState,
  tabs: initialTabsState,
};
