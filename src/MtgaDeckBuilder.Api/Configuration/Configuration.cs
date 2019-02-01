﻿namespace MtgaDeckBuilder.Api.Configuration
{
    public class Configuration : IConfiguration
    {
        public string OutputLogPath { get; set; }

        public string MtgSetJsonDirectoryPath { get; set; }

        public string PlayerCardsCommand { get; set; }

        public string PlayerDecksCommand { get; set; }
    }
}