namespace MtgaDeckBuilder.Api.Configuration
{
  public class Configuration : IConfiguration
  {
    public string PlayerCardsCommand { get; set; }

    public string PlayerDecksCommand { get; set; }

    public string PlayerDeckCreateCommand { get; set; }

    public string PlayerDeckUpdateCommand { get; set; }

    public string PlayerDeckDeleteCommand { get; set; }
    
    public string PlayerInventoryCommand { get; set; }

    public string PlayerNameCommand { get; set; }
  }
}
