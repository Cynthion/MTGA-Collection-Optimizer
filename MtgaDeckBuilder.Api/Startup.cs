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

            // add CORS policy to be used below
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

            services.AddSingleton<ISettings, Settings>();
            services.AddSingleton<ILayoutService, LayoutService>();
            services.AddSingleton<ILogParser, LogParser>();

            services.AddSingleton<IGameDataLoader, GameDataLoader>();
            services.AddSingleton<IImageDataLoader, ImageDataLoader>();
            services.AddSingleton<IGameDataRepository, GameDataRepository>();
            services.AddSingleton<IImageDataRepository, ImageDataRepository>();
            services.AddSingleton<IAssetsManager, AssetsManager>();

            services.AddSingleton<ILogWatcher, LogWatcher>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // use custom global exception handling
            app.ConfigureExceptionHandler();

            app.UseHttpsRedirection();

            app.UseRouting();

            // add CORS middleware, place before UseAuthentication, UseAuthorization, and UseEndpoints
            app.UseCors("default");

            //app.UseAuthorization(); // place after UserRouting and UseCors, but before UseEndpoints

            // add SSE middleware
            app.MapServerSentEvents("/api/sse-layout-data");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}