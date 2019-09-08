namespace MtgaDeckBuilder.Api.Controllers
{
    public interface IMtgaCard
    {
        long MtgaId { get; set; }

        string Name { get; set; }

        int Rarity { get; set; } // TODO make enum

        string Set { get; set; }

        int Type { get; set; } // TODO make enum

        int Subtype { get; set; } // TODO make enum?

        int[] Colors { get; set; } // TODO make enum

        string[] Abilities { get; set; }

        string[] HiddenAbilities { get; set; }
    }
}
