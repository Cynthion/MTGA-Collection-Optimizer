import * as _ from 'lodash';

import { PlayerDeckState, Rarity, CollectionCardState } from '../missing-cards/missing-cards-page';

const wcCommonDropRate: number = 1 / 3;         // 0.33
const wcUncommonDropRate: number = 1 / 5;       // 0.20
const wcRareDropRate: number = 1 / 10;          // 0.10, not accurate according to real drop rates
const wcMythicRareDropRate: number = 1 / 24;    // 0.04

// sum of (progress with card * deck total worth) per deck where that card is missing
function calcCardWorth(collectionCard: CollectionCardState, playerDecks: PlayerDeckState[]): number {
    // get decks containing that card
    const containingDecks = playerDecks.filter(d => _.some(d.cards, (c: CollectionCardState) => collectionCard.mtgaId === c.mtgaId));

    // get decks that miss that card
    let cardWorth = 0;
    for (let i = 0; i < containingDecks.length; i++) {
        const containingDeck = containingDecks[i];

        const ownedCount = collectionCard.ownedCount;
        const requiredCount = containingDeck.cards.find(c => c.mtgaId === collectionCard.mtgaId).requiredCount;

        if (requiredCount < ownedCount) {
            const deckProgressWithCard = ((containingDeck.totalOwnedCards + 1) / containingDeck.totalDeckCards) * 100;
            const deckTotalWorth = calcDeckTotalWorth(containingDeck);

            cardWorth += (deckProgressWithCard * deckTotalWorth);
        }
    }

    return cardWorth;
}

function calcDeckTotalWorth(deckState: PlayerDeckState): number {
    const nrOfCards = deckState.cards.length;

    const weightCommon = deckState.cards.filter(c => c.rarity === Rarity.Common).length * wcCommonDropRate;
    const weightUncommon = deckState.cards.filter(c => c.rarity === Rarity.Uncommon).length * wcUncommonDropRate;
    const weightRare = deckState.cards.filter(c => c.rarity === Rarity.Rare).length * wcRareDropRate;
    const weightMythicRare = deckState.cards.filter(c => c.rarity === Rarity['Mythic Rare']).length * wcMythicRareDropRate;
    const totalWeight = weightCommon + weightUncommon + weightRare + weightMythicRare;

    const deckWorth = nrOfCards - totalWeight;

    return deckWorth;
}

function calcDeckProgressInPercent(deckState: PlayerDeckState): number {
    return 
}