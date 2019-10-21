import { Rarity } from './domain.state';

export function getRarityClass(rarity: Rarity): string {
  switch (rarity) {
    case Rarity.Type: return 'type-color';
    case Rarity.Land: return 'land-color';
    case Rarity.Common: return 'common-color';
    case Rarity.Uncommon: return 'uncommon-color';
    case Rarity.Rare: return 'rare-color';
    case Rarity.MythicRare: return 'mythic-color';
    default: return 'unknown-color';
  }
}

export function getOwnedOfRequired(ownedCount: number, requiredCount: number): string {
  const count = ownedCount > requiredCount
    ? requiredCount
    : ownedCount;
  return `${count} / ${requiredCount}`;
}
