﻿using System;

namespace MtgaDeckBuilder.Api.Configuration
{
    public class Settings : ISettings
    {
        private const string UserNamePlaceholder = "{user name}";

        private string _outputLogPath = $@"C:\Users\{UserNamePlaceholder}\AppData\LocalLow\Wizards Of The Coast\\MTGA\output_log.txt";
        private int _logPollInterval = 5;

        public string OutputLogPath
        {
            get => TryReplaceUserNamePlaceholder(_outputLogPath);
            set => _outputLogPath = value;
        } 

        public int LogPollInterval
        {
            get => _logPollInterval > 0 ? _logPollInterval : 5;
            set => _logPollInterval = value;
        }

        private static string TryReplaceUserNamePlaceholder(string outputLogPath)
        {
            if (outputLogPath.Contains(UserNamePlaceholder))
            {
                outputLogPath = outputLogPath.Replace(UserNamePlaceholder, Environment.UserName);
            }

            return outputLogPath;
        }
    }
}