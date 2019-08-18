import { initialTabsState, TabsState } from "./tabs.state";
import { TabsActionTypes, TabsActions } from "./tabs.actions";
import { decksTabReducer, InitializeDecksTabAction } from "./decks-tab";

export function tabsReducer(state = initialTabsState, action: TabsActions): TabsState {
  switch (action.type) {

    case TabsActionTypes.Initialize: {
      return {
        ...state,
        decksTab: decksTabReducer(state.decksTab, new InitializeDecksTabAction())
      }

      // let collectionCardStates: CollectionCardState[] = [];

      // // enrich player cards, then add to collection cards
      // const playerCardStates: PlayerCardState[] = action.dto.playerCards.map(enrichToCollectionCardState);
      // const collectionPlayerCardStates: CollectionCardState[] = playerCardStates.map(playerCardState => {
      //   return {
      //     ...playerCardState,
      //     missingCount: 0,
      //   } as CollectionCardState;
      // });
      // collectionCardStates.push(...collectionPlayerCardStates);

      // // enrich deck cards, then add to collection cards
      // const playerDecksStates: PlayerDeckState[] = [];
      // for (const playerDeckDto of action.dto.playerDecks) {
      //   let totalOwnedCards = 0;

      //   const deckCardStates: DeckCardState[] = playerDeckDto.cards.map(dcDto => {
      //     // if player has card, then take its owned count
      //     const playerCardState = playerCardStates.find(pcState => pcState.mtgaId === dcDto.mtgaId);
      //     const ownedCount = playerCardState && playerCardState.ownedCount || 0;
      //     totalOwnedCards += ownedCount;

      //     const dcState = enrichToDeckCardState(dcDto);
      //     const collectionCardDuplicate = collectionCardStates.find(ccState => ccState.mtgaId === dcState.mtgaId);

      //     const missingCount = dcState.requiredCount - ownedCount;

      //     if (collectionCardDuplicate) {
      //       // if collection already contains card, take max missing count
      //       collectionCardDuplicate.missingCount = _.max([collectionCardDuplicate.missingCount, missingCount]);
      //     } else {
      //       // else add the new card to the collection
      //       collectionCardStates.push({
      //         ...dcState,
      //         ownedCount,
      //         missingCount,
      //         wildcardWorthinessFactor: 0,
      //       });
      //     }

      //     return dcState;
      //   });

      //   const totalDeckCards = deckCardStates.map(dc => dc.requiredCount).reduce(sum);

      //   playerDecksStates.push({
      //     ...playerDeckDto,
      //     cards: deckCardStates,
      //     totalOwnedCards,
      //     totalDeckCards,
      //     completeness: totalOwnedCards / totalDeckCards,
      //   });
      // }

      // collectionCardStates = _.orderBy(collectionCardStates, ['rarity', 'name'], ['desc', 'asc']);

      // for (const collectionCard of collectionCardStates) {
      //   collectionCard.wildcardWorthinessFactor = calcWildcardWorthinessFactor(collectionCard, playerDecksStates);
      // }

      // const newState: MissingCardsPageState = {
      //   ...action.dto,
      //   ...state,
      //   playerDecks: playerDecksStates,
      //   playerCards: playerCardStates,
      //   collectionCards: collectionCardStates,
      // };

      // return newState;
    }

    default: {
      return state;
    }
  }
}

function sum(accumulator: number, summand: number): number {
  return accumulator + summand;
}
