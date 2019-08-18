import { allCards as mtgCardDb } from 'mtga';
import * as _ from 'lodash';

import { calcWildcardWorthinessFactor } from '../../util/calculations';
import {
  MissingCardsPageState,
  initialMissingCardsPageState,
  PlayerDeckState,
  PlayerCardState,
  PlayerCardDto,
  DeckCardDto,
  DeckCardState,
  CollectionCardState,
  Rarity,
} from './missing-cards.state';
import { MissingCardsActions, MissingCardsActionTypes } from './missing-cards.actions';

export function missingCardsPageReducer(state = initialMissingCardsPageState, action: MissingCardsActions): MissingCardsPageState {
  switch (action.type) {

    // TODO whole business logic should not be done in reducer
    case MissingCardsActionTypes.Initialized: {
      let collectionCardStates: CollectionCardState[] = [];

      // enrich player cards, then add to collection cards
      const playerCardStates: PlayerCardState[] = action.dto.playerCards.map(enrichToCollectionCardState);
      const collectionPlayerCardStates: CollectionCardState[] = playerCardStates.map(playerCardState => {
        return {
          ...playerCardState,
          missingCount: 0,
        } as CollectionCardState;
      });
      collectionCardStates.push(...collectionPlayerCardStates);

      // enrich deck cards, then add to collection cards
      const playerDecksStates: PlayerDeckState[] = [];
      for (const playerDeckDto of action.dto.playerDecks) {
        let totalOwnedCards = 0;

        const deckCardStates: DeckCardState[] = playerDeckDto.cards.map(dcDto => {
          // if player has card, then take its owned count
          const playerCardState = playerCardStates.find(pcState => pcState.mtgaId === dcDto.mtgaId);
          const ownedCount = playerCardState && playerCardState.ownedCount || 0;
          totalOwnedCards += ownedCount;

          const dcState = enrichToDeckCardState(dcDto);
          const collectionCardDuplicate = collectionCardStates.find(ccState => ccState.mtgaId === dcState.mtgaId);

          const missingCount = dcState.requiredCount - ownedCount;

          if (collectionCardDuplicate) {
            // if collection already contains card, take max missing count
            collectionCardDuplicate.missingCount = _.max([collectionCardDuplicate.missingCount, missingCount]);
          } else {
            // else add the new card to the collection
            collectionCardStates.push({
              ...dcState,
              ownedCount,
              missingCount,
              wildcardWorthinessFactor: 0,
            });
          }

          return dcState;
        });

        const totalDeckCards = deckCardStates.map(dc => dc.requiredCount).reduce(sum);

        playerDecksStates.push({
          ...playerDeckDto,
          cards: deckCardStates,
          totalOwnedCards,
          totalDeckCards,
          completeness: totalOwnedCards / totalDeckCards,
        });
      }

      collectionCardStates = _.orderBy(collectionCardStates, ['rarity', 'name'], ['desc', 'asc']);
      const nrOfUnknownCards = collectionCardStates.filter(cc => cc.rarity === -1).length;

      for (const collectionCard of collectionCardStates) {
        collectionCard.wildcardWorthinessFactor = calcWildcardWorthinessFactor(collectionCard, playerDecksStates);
      }

      const newState: MissingCardsPageState = {
        ...action.dto,
        ...state,
        playerDecks: playerDecksStates,
        playerCards: playerCardStates,
        collectionCards: collectionCardStates,
        nrOfUnknownCards,
      };

      return newState;
    }

    case MissingCardsActionTypes.SortDeckColumns: {
      return {
        ...state,
        sortDeckColumnOrder: action.sortDeckColumnOrder,
      };
    }

    default: {
      return state;
    }
  }
}

function enrichToCollectionCardState(playerCardDto: PlayerCardDto): PlayerCardState {
  const mtgCard = mtgCardDb.findCard(playerCardDto.mtgaId);

  return ({
    ...playerCardDto,
    name: !!mtgCard ? mtgCard.get('prettyName') : '<Unknown Name>',
    rarity: !!mtgCard ? Rarity[`${mtgCard.get('rarity')}`] : Rarity.Unknown,
    setCode:  !!mtgCard ? mtgCard.get('set') : '<Unknown Set>',
  });
}

function enrichToDeckCardState(deckCardDto: DeckCardDto): DeckCardState {
  const mtgCard = mtgCardDb.findCard(deckCardDto.mtgaId);
  return ({
    ...deckCardDto,
    name: !!mtgCard ? mtgCard.get('prettyName') : '<Unknown Name>',
    rarity: !!mtgCard ? Rarity[`${mtgCard.get('rarity')}`] : Rarity.Unknown,
    setCode:  !!mtgCard ? mtgCard.get('set') : '<Unknown Set>',
  });
}

function sum(accumulator: number, summand: number): number {
  return accumulator + summand;
}
