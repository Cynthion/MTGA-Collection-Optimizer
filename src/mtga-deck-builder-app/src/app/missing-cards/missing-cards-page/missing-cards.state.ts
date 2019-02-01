import { RootState as AppRootState } from '../../app.state';

export interface RootState extends AppRootState {
  missingCards: MissingCardsPageState;
}

// tslint:disable-next-line:no-empty-interface
export interface MissingCardsPageDto {

}

// tslint:disable-next-line:no-empty-interface
export interface MissingCardsPageState extends MissingCardsPageDto {

}
