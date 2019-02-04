export interface InventoryDto {
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
  wildcardCommon: 0,
  wildcardUncommon: 0,
  wildcardRare: 0,
  wildcardMythic: 0,
  gold: 0,
  gems: 0,
  vaultProgress: 0,
};
