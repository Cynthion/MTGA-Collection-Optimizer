import { RootState as AppRootState } from '../../app.state';

export const MISSING_CARDS_PAGE_STATE_FEATURE_NAME: keyof RootState = 'missingCardsPage';

export interface RootState extends AppRootState {
  missingCardsPage: MissingCardsPageState;
}

export interface MissingCardDto {
  id: string;
  missingQuantity: number;
  rarity: string;
}

export interface MissingCardsPageDto {
  missingCards: MissingCardDto[];
}

export interface MissingCardsPageState extends MissingCardsPageDto {

}

export const initialMissingCardsPageState: MissingCardsPageState = {
  missingCards: [],
};
