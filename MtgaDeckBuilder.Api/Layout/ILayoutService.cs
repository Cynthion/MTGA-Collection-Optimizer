namespace MtgaDeckBuilder.Api.Layout
{
    public interface ILayoutService
    {
        bool IsDetailedLogDisabled();

        LayoutDto LoadLayout();
    }
}
