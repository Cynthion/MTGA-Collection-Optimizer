import { Rarity } from './domain.state';

export function getRarityClass(rarity: Rarity): string {
  switch (rarity) {
    case Rarity['Mythic Rare']: return 'mythic-color';
    case Rarity.Rare: return 'rare-color';
    case Rarity.Uncommon: return 'uncommon-color';
    case Rarity.Common: return 'common-color';
    case Rarity.Basic: return 'basic-color';
    default: return 'unknown-color';
  }
}

// export function getOwnedOfRequired(ownedCount: number, requiredCount: number): string {
//   const count = ownedCount > requiredCount
//     ? requiredCount
//     : ownedCount;
//   return `${count} / ${requiredCount}`;
// }
