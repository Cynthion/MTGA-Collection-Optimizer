// import { Action } from '@ngrx/store';

// import { PlayerDeckDto, DeckCardDto, PlayerCardDto } from './domain.state';

// export enum DomainActionTypes {
//   InitializePlayerCard = '[Domain] Initialize Player Card',
//   InitializeDeckCard = '[Domain] Initialize Deck Card',
//   InitializePlayerDeck = '[Domain] Initialize Player Deck',
// }

// export class InitializePlayerCardsAction implements Action {
//   readonly type = DomainActionTypes.InitializePlayerCard;

//   constructor(
//     public dto: PlayerCardDto,
//   ) { }
// }

// export class InitializeDeckCardAction implements Action {
//   readonly type = DomainActionTypes.InitializeDeckCard;

//   constructor(
//     public dto: DeckCardDto,
//   ) { }
// }

// export class InitializePlayerDeckAction implements Action {
//   readonly type = DomainActionTypes.InitializePlayerDeck;

//   constructor(
//     public dto: PlayerDeckDto,
//   ) { }
// }

// export type DomainActions =
//   | InitializePlayerCardsAction
//   | InitializeDeckCardAction
//   | InitializePlayerDeckAction
//   ;
