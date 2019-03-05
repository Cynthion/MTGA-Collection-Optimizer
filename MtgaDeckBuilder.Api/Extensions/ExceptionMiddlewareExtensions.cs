﻿using System.Net;
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

                        var apiErrorDetailsDto = new ApiErrorDetailsDto
                        {
                            StatusCode = context.Response.StatusCode,
                            Message = exception.Message,
                        };

                        if (exception is ApiException apiException)
                        {
                            apiErrorDetailsDto.ApiErrorCode = apiException.ApiErrorCode;
                        }

                        await context.Response.WriteAsync(apiErrorDetailsDto.ToString());
                    }
                });
            });
        }
    }
}
