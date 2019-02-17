using System;
using System.IO;
using Lib.AspNetCore.ServerSentEvents;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.LogImport;
using MtgaDeckBuilder.Api.MissingCards;
using MtgaDeckBuilder.Api.SetImport;
using Newtonsoft.Json.Serialization;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace MtgaDeckBuilder.Api
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
        }

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
                OutputLogPath = $@"C:\Users\{Environment.UserName}\AppData\LocalLow\Wizards Of The Coast\MTGA\output_log.txt",
                // TODO move to executable directory
                MtgaDeckBuilderDropFolderPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "MTGA Deck Builder"),
                PlayerCardsCommand = "<== PlayerInventory.GetPlayerCardsV3",
                PlayerDecksCommand = "<== Deck.GetDeckLists",
                PlayerInventoryCommand = "<== PlayerInventory.GetPlayerInventory",
                PlayerNameCommand = "[Accounts - Client] Successfully logged in to account: ",
            });
            services.AddSingleton<IMissingCardsService, MissingCardsService>();
            services.AddSingleton<ILogParser, LogParser>();
            services.AddSingleton<ISetLoader, SetLoader>();
            services.AddSingleton<IStorage, FileStorage>();

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
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();
   
            // first, add CORS middleware
            app.UseCors(builder => builder.WithOrigins("http://localhost:4200"));

            // add SSE middleware
            app.MapServerSentEvents("/api/sse-missingcards");

            app.UseMvc();
        }
    }
}