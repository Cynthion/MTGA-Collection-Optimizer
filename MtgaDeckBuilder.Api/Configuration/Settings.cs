using System;
using System.IO;

namespace MtgaDeckBuilder.Api.Configuration
{
    public interface ISettings
    {
        int LogPollInterval { get; set; }

        string OutputLogPath { get; set; }

        string GameDataPath { get; set; }

        void AssertOutputLogPathValid();
    }

    public class Settings : ISettings
    {
        private const string UserNamePlaceholder = "{user name}";

        // default backend values
        private int _logPollInterval = 5;
        private string _outputLogPath = $@"C:\Users\{UserNamePlaceholder}\AppData\LocalLow\Wizards Of The Coast\MTGA\output_log.txt";
        private string _gameDataPath = $@"C:\Program Files (x86)\Wizards Of The Coast\MTGA\MTGA_Data\Downloads\Data";

        public int LogPollInterval
        {
            get => _logPollInterval > 0 ? _logPollInterval : 5;
            set => _logPollInterval = value;
        }

        public string OutputLogPath
        {
            get => TryReplaceUserNamePlaceholder(_outputLogPath);
            set => _outputLogPath = value;
        }

        public string GameDataPath
        {
            get => _gameDataPath;
            set => _gameDataPath = value;
        }

        public void AssertOutputLogPathValid()
        {
            try
            {
                using (new FileStream(OutputLogPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                }
            }
            catch (Exception)
            {
                throw new ApiException(ApiErrorCode.OutputLogPathInvalid);
            }
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