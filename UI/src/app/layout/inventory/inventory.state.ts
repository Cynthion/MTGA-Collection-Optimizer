import { State as ParentState } from '../layout.state';

export interface State extends ParentState {
  inventory: InventoryState;
}

export interface WildcardRequirementsState {
  wildcardCommonRequired: number;
  wildcardUncommonRequired: number;
  wildcarRareRequired: number;
  wildcardMythicRequired: number;
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
  wildcardRequirements: WildcardRequirementsState;
  nrOfUnknownCards: number;
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
    wildcarRareRequired: 0,
    wildcardMythicRequired: 0,
  },
  nrOfUnknownCards: 0,
};
