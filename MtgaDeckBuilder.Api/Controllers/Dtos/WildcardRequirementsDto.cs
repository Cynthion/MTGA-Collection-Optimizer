namespace MtgaDeckBuilder.Api.Controllers.Dtos
{
    public class WildcardRequirementsDto
    {
        public int WildcardCommonRequired { get; set; }

        public int WildcardUncommonRequired { get; set; }

        public int WildcardRareRequired { get; set; }

        public int WildcardMythicRareRequired { get; set; }
    }
}
