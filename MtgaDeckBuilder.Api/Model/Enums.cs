namespace MtgaDeckBuilder.Api.Model
{
    /// <summary>
    /// Card.Rarity
    /// </summary>
    public enum Rarity
    {
        Unknown = -1,
        Type = 0,
        Land = 1,
        Common = 2,
        Uncommon = 3,
        Rare = 4,
        MythicRare = 5,
    }

    /// <summary>
    /// Enum.Color.Id
    /// </summary>
    public enum Color
    {
        White = 1,
        Blue = 2,
        Black = 3,
        Red = 4,
        Green = 5,
    }

    /// <summary>
    /// Enum.CardType.Id
    /// </summary>
    public enum CardType
    {
        Unknown = -1,
        Artifact = 1,
        Creature = 2,
        Enchantment = 3,
        Instant = 4,
        Land = 5,
        Phenomenon = 6,
        Plane = 7,
        Planeswalker = 8,
        Scheme = 9,
        Sorcery = 10,
        Tribal = 11,
        Vanguard = 12,
    }
}
