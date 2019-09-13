// import { allCards as mtgCardDb } from 'mtga';

// import { initialPlayerDeckState, PlayerDeckState, DeckCardState, initialDeckCardState, Rarity, PlayerCardState, initialPlayerCardState } from './domain.state';
// import { DomainActionTypes, DomainActions, InitializeDeckCardAction } from './domain.actions';

// export function playerCardsReducer(state: PlayerCardState = initialPlayerCardState, action: DomainActions): PlayerCardState {
//   switch (action.type) {
//     case DomainActionTypes.InitializePlayerCard: {
//       const mtgCard = mtgCardDb.findCard(action.dto.mtgaId);

//       const newState = {
//         ...state,
//         ...action.dto,
//         name: !!mtgCard ? mtgCard.get('prettyName') : '<?>',
//         rarity: !!mtgCard ? Rarity[`${mtgCard.get('rarity')}`] : Rarity.Unknown,
//         setCode:  !!mtgCard ? mtgCard.get('set') : '<?>',
//       };

//       // exception: if the card is a Basic Land, MTGA provides infinite copies of it instead of 1
//       if (newState.rarity === Rarity['Basic Land']) {
//         newState.ownedCount = 1000;
//       }

//       return newState;
//     }

//     default: {
//       return state;
//     }
//   }
// }

// export function deckCardReducer(state: DeckCardState = initialDeckCardState, action: DomainActions): DeckCardState {
//   switch (action.type) {
//     case DomainActionTypes.InitializeDeckCard: {
//       const mtgCard = mtgCardDb.findCard(action.dto.mtgaId);

//       return {
//         ...state,
//         ...action.dto,
//         name: !!mtgCard ? mtgCard.get('prettyName') : '<?>',
//         rarity: !!mtgCard ? Rarity[`${mtgCard.get('rarity')}`] : Rarity.Unknown,
//         setCode:  !!mtgCard ? mtgCard.get('set') : '<?>',
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// }

// export function playerDeckReducer(state: PlayerDeckState = initialPlayerDeckState, action: DomainActions): PlayerDeckState {
//   switch (action.type) {
//     case DomainActionTypes.InitializePlayerDeck: {
//       return {
//         ...state,
//         ...action.dto,
//         cards: action.dto.cards.map((dto, idx) => deckCardReducer(state.cards[idx], new InitializeDeckCardAction(dto))),
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// }
