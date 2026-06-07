using RecipeManager.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSqlite<RecipeManagerContext>(
    "Data Source=recipes.db"
);

var app = builder.Build();

using var scope = app.Services.CreateAsyncScope();
var dbContext = scope.ServiceProvider.GetRequiredService<RecipeManagerContext>();
await DataSeeder.SeedDatabaseAsync(dbContext);

app.MapEndpoints();

app.Run();
