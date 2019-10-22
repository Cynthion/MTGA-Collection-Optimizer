using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using NLog;

namespace MtgaDeckBuilder.Api.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(ExceptionMiddlewareExtensions));

        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {
                        var exception = contextFeature.Error;
                        Logger.Error($"Something went wrong: {exception}");

                        var apiErrorDetailsDto = new ApiErrorDto
                        {
                            StatusCode = context.Response.StatusCode,
                            Message = exception.Message,
                        };

                        if (exception is ApiException apiException)
                        {
                            apiErrorDetailsDto.ApiErrorCode = apiException.ApiErrorCode;
                        }
                        else
                        {
                            apiErrorDetailsDto.ApiErrorCode = null;
                        }

                        var jsonResponse = JsonSerializer.Serialize(apiErrorDetailsDto, new JsonSerializerOptions
                        {
                            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                            PropertyNameCaseInsensitive = true,
                        });

                        await context.Response.WriteAsync(jsonResponse);
                    }
                });
            });
        }
    }
}
