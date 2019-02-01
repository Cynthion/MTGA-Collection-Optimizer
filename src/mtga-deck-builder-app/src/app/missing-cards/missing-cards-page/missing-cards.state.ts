import { RootState as AppRootState } from '../../app.state';

export const MISSING_CARDS_PAGE_STATE_FEATURE_NAME: keyof RootState = 'missingCards';

export interface RootState extends AppRootState {
  missingCards: MissingCardsPageState;
}

// tslint:disable-next-line:no-empty-interface
export interface MissingCardsPageDto {

}

// tslint:disable-next-line:no-empty-interface
export interface MissingCardsPageState extends MissingCardsPageDto {

}

export const initialMissingCardsPageState: MissingCardsPageState = {

};
