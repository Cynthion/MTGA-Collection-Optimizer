using Lib.AspNetCore.ServerSentEvents;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.Extensions;
using MtgaDeckBuilder.Api.LogImport;
using MtgaDeckBuilder.Api.MissingCards;
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

            services.AddSingleton<IConfiguration>(provider => new Configuration.Configuration
            {
                PlayerCardsCommand = "<== PlayerInventory.GetPlayerCardsV3",
                PlayerDecksCommand = "<== Deck.GetDeckLists",
                PlayerInventoryCommand = "<== PlayerInventory.GetPlayerInventory",
                PlayerNameCommand = "[Accounts - Client] Successfully logged in to account: ",
            });
            services.AddSingleton<ISettings, Settings>();
            services.AddSingleton<IMissingCardsService, MissingCardsService>();
            services.AddSingleton<ILogParser, LogParser>();

            services.AddSingleton<IHostedService, LogWatcher>();
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
                .WithHeaders("Content-Type"));

            // add SSE middleware
            app.MapServerSentEvents("/api/sse-missingcards");

            app.UseMvc();
        }
    }
}