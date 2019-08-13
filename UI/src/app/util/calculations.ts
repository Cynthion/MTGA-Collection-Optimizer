import { PlayerDeckState, Rarity } from '../missing-cards/missing-cards-page';

const wcCommonDropRate: number = 1 / 3;         // 0.33
const wcUncommonDropRate: number = 1 / 5;       // 0.20
const wcRareDropRate: number = 1 / 10;          // 0.10, not accurate according to real drop rates
const wcMythicRareDropRate: number = 1 / 24;    // 0.04

function calcDeckWorth(deckState: PlayerDeckState): number {
    const nrOfCards = deckState.cards.length;

    const weightCommon = deckState.cards.filter(c => c.rarity === Rarity.Common).length * wcCommonDropRate;
    const weightUncommon = deckState.cards.filter(c => c.rarity === Rarity.Uncommon).length * wcUncommonDropRate;
    const weightRare = deckState.cards.filter(c => c.rarity === Rarity.Rare).length * wcRareDropRate;
    const weightMythicRare = deckState.cards.filter(c => c.rarity === Rarity['Mythic Rare']).length * wcMythicRareDropRate;
    const totalWeight = weightCommon + weightUncommon + weightRare + weightMythicRare;

    const deckWorth = nrOfCards - totalWeight;

    return deckWorth;
}
