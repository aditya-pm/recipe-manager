public static class EndpointExtensions
{
    public static void MapEndpoints(this WebApplication app)
    {
        app.MapRecipeEndpoints();
        app.MapCategoryEndpoints();
        app.MapTagEndpoints();
    }
}