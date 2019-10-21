import { State as ParentState } from '../layout.state';

export interface State extends ParentState {
  inventory: InventoryState;
}

export interface WildcardRequirementsDto {
  wildcardCommonRequired: number;
  wildcardUncommonRequired: number;
  wildcardRareRequired: number;
  wildcardMythicRareRequired: number;
}

export interface WildcardRequirementsState extends WildcardRequirementsDto {
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
  wildcardRequirements: WildcardRequirementsDto;
}

export interface InventoryState extends InventoryDto {
  wildcardRequirements: WildcardRequirementsState;
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
  wildcardRequirements: {
    wildcardCommonRequired: 0,
    wildcardUncommonRequired: 0,
    wildcardRareRequired: 0,
    wildcardMythicRareRequired: 0,
  },
};
