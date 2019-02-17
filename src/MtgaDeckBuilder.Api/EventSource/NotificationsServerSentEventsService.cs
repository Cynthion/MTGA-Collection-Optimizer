using Lib.AspNetCore.ServerSentEvents;

namespace MtgaDeckBuilder.Api.EventSource
{
    public class NotificationsServerSentEventsService : ServerSentEventsService, INotificationsServerSentEventsService
    { }
}