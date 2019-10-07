using Lib.AspNetCore.ServerSentEvents;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.Extensions;
using MtgaDeckBuilder.Api.Game;
using MtgaDeckBuilder.Api.ImageImport;
using MtgaDeckBuilder.Api.Layout;
using MtgaDeckBuilder.Api.LogImport;
using MtgaDeckBuilder.ImageLoader;
using Newtonsoft.Json.Serialization;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace MtgaDeckBuilder.Api
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // first, add CORS
            services.AddCors();

            // add server-sent events
            services.AddServerSentEvents();

            // Add framework services
            services.AddMvc().AddJsonOptions(options =>
            {
                // return json format with Camel Case
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });
            services.AddSingleton<IFileLocations>(provider => new FileLocations
            {
                AbilitiesDataPrefix ="data_abilities_",
                CardsDataPrefix ="data_cards_",
                EnumsDataPrefix ="data_enums_",
                LocalityDataPrefix ="data_loc_",
                MtgaDownloadsDataDirectoryPath = @"G:\MTGArenaLive\MTGA_Data\Downloads\Data",
            });
            services.AddSingleton<IConfiguration>(provider => new Configuration.Configuration
            {
                DetailedLogCommand = "DETAILED LOGS:",
                PlayerCardsCommand = "<== PlayerInventory.GetPlayerCardsV3",
                PlayerDecksCommand = "<== Deck.GetDeckListsV3",
                PlayerDeckCreateCommand = "<== Deck.CreateDeckV3",
                PlayerDeckUpdateCommand = "<== Deck.UpdateDeckV3",
                PlayerDeckDeleteCommand = "==> Deck.DeleteDeck",
                PlayerInventoryCommand = "<== PlayerInventory.GetPlayerInventory",
                PlayerNameCommand = "[Accounts - Client] Successfully logged in to account: ",
            });
            services.AddSingleton<ISettings, Settings>();
            services.AddSingleton<ILayoutService, LayoutService>();
            services.AddSingleton<ILogParser, LogParser>();

            services.AddSingleton<IGameDataLoader, GameDataLoader>();
            services.AddSingleton<IAssetsManager, AssetsManager>();
            services.AddSingleton<IImageImporter, ImageImporter>();
            services.AddSingleton<IGameData>(provider =>
            {
                return new GameData(provider.GetService<IGameDataLoader>());
            });

            // TODO run both in parallel!
            //services.AddHostedService<LogWatcher>();
            services.AddHostedService<ExecuteImageImporter>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.ConfigureExceptionHandler();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();
   
            // first, add CORS middleware
            app.UseCors(builder => builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyHeader());

            // add SSE middleware
            app.MapServerSentEvents("/api/sse-layout-data");

            app.UseMvc();
        }
    }
}