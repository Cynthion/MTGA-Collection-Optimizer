using Lib.AspNetCore.ServerSentEvents;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
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

namespace MtgaDeckBuilder.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // adds support for controllers and API-related features, but not views or pages
            services.AddControllers();

            // first, add CORS
            services.AddCors(options =>
            {
                options.AddPolicy("default", builder =>
                {
                    builder
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("http://localhost:4200");
                });
            });

            // add server-sent events
            services.AddServerSentEvents();

            // Add framework services
            services.AddMvc().AddNewtonsoftJson(options =>
            {
                // return json format with Camel Case
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });

            services.AddSingleton<IFileLocations>(provider => new FileLocations
            {
                AbilitiesDataPrefix = "data_abilities_",
                CardsDataPrefix = "data_cards_",
                EnumsDataPrefix = "data_enums_",
                LocalityDataPrefix = "data_loc_",
                MtgaDownloadsDataDirectoryPath = @"G:\MTGArenaLive\MTGA_Data\Downloads\Data",
            });
            services.AddSingleton<IMtgaAppConfiguration>(provider => new Configuration.MtgaAppConfiguration
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
            services.AddSingleton<IImageDataLoader, ImageDataLoader>();
            services.AddSingleton<IGameDataRepository, GameDataRepository>();
            services.AddSingleton<IImageDataRepository, ImageDataRepository>();
            services.AddSingleton<IAssetsManager, AssetsManager>();

            //services.AddHostedService<LogWatcher>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //else
            //{
            //    app.UseHsts();
            //}

            // use custom global exception handling
            app.ConfigureExceptionHandler();

            app.UseHttpsRedirection();

            app.UseStaticFiles(); // place before UseRouting

            app.UseRouting();

            // add CORS middleware, place before UseAuthentication, UseAuthorization, and UseEndpoints
            app.UseCors("default");

            //app.UseAuthorization(); // place after UserRouting and UseCors, but before UseEndpoints

            app.UseCookiePolicy();

            // add SSE middleware
            app.MapServerSentEvents("/api/sse-layout-data");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}