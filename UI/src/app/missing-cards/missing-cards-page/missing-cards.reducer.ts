import { allCards as mtgCardDb } from 'mtga';
import * as _ from 'lodash';

import {
  MissingCardsPageState,
  initialMissingCardsPageState,
  PlayerDeckState,
  rarityDictionary,
  PlayerCardState,
  PlayerCardDto,
  DeckCardDto,
  DeckCardState,
  CollectionCardState,
} from './missing-cards.state';
import { MissingCardsActions, MissingCardsActionTypes } from './missing-cards.actions';

export function missingCardsPageReducer(state = initialMissingCardsPageState, action: MissingCardsActions): MissingCardsPageState {
  switch (action.type) {

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
      const playerDecksState: PlayerDeckState[] = [];
      for (const playerDeckDto of action.dto.playerDecks) {
        let totalOwnedCardsCalc = 0;

        const deckCardStates: DeckCardState[] = playerDeckDto.cards.map(dcDto => {
          // if player has card, then take its owned count
          const playerCardState = playerCardStates.find(pcState => pcState.mtgaId === dcDto.mtgaId);
          const ownedCount = playerCardState && playerCardState.ownedCount || 0;
          totalOwnedCardsCalc += ownedCount;

          const dcState = enrichToDeckCardState(dcDto);
          const collectionCardDuplicate = collectionCardStates.find(ccState => ccState.mtgaId === dcState.mtgaId);
          if (collectionCardDuplicate) {
            // if collection already contains card, update missing count to max
            collectionCardDuplicate.missingCount = _.max([collectionCardDuplicate.missingCount, dcState.requiredCount - ownedCount]);
          } else {
            // else add the new card to the collection
            collectionCardStates.push({
              ...dcState,
              missingCount: dcState.requiredCount - ownedCount,
              ownedCount,
            });
          }

          return dcState;
        });

        const totalDeckCardsCalc = deckCardStates.map(pc => pc.requiredCount).reduce(sum);

        playerDecksState.push({
          ...playerDeckDto,
          cards: deckCardStates,
          totalOwnedCards: totalOwnedCardsCalc,
          totalDeckCards: totalDeckCardsCalc,
        });
      }

      collectionCardStates = _.orderBy(collectionCardStates, ['rarity', 'name'], ['desc', 'asc']);

      const newState: MissingCardsPageState = {
        ...action.dto,
        ...state,
        playerDecks: playerDecksState,
        playerCards: playerCardStates,
        collectionCards: collectionCardStates,
      };

      return newState;
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
    name: mtgCard.get('prettyName'),
    rarity: rarityDictionary[mtgCard.get('rarity')],
    setCode: mtgCard.get('set'),
  });
}

function enrichToDeckCardState(deckCardDto: DeckCardDto): DeckCardState {
  const mtgCard = mtgCardDb.findCard(deckCardDto.mtgaId);
  return ({
    ...deckCardDto,
    name: mtgCard.get('prettyName'),
    rarity: rarityDictionary[mtgCard.get('rarity')],
    setCode: mtgCard.get('set'),
  });
}

function sum(accumulator: number, summand: number): number {
  return accumulator + summand;
}
