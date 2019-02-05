import { AppState } from 'src/app/app.state';

export const INVENTORY_FEATURE_NAME: keyof InventoryFeatureState = 'inventory';

export interface InventoryFeatureState extends AppState {
  inventory: InventoryState;
}

export interface InventoryDto {
  playerName: string;
  wildcardCommon: number;
  wildcardUncommon: number;
  wildcardRare: number;
  wildcardMythic: number;
  gold: number;
  gems: number;
  vaultProgress: number;
}

export interface InventoryState extends InventoryDto {

}

export const initialInventoryState: InventoryState = {
  playerName: '',
  wildcardCommon: 0,
  wildcardUncommon: 0,
  wildcardRare: 0,
  wildcardMythic: 0,
  gold: 0,
  gems: 0,
  vaultProgress: 0,
};
