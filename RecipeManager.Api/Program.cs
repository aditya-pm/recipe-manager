using RecipeManager.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSqlite<RecipeManagerContext>(
    "Data Source=recipes.db"
);
builder.Services.AddCors();
builder.Services.AddHttpClient();

var app = builder.Build();

app.UseCors(policy =>
{
    policy.AllowAnyOrigin()
          .AllowAnyHeader()
          .AllowAnyMethod();
});

using var scope = app.Services.CreateAsyncScope();
var dbContext = scope.ServiceProvider.GetRequiredService<RecipeManagerContext>();
await DataSeeder.SeedDatabaseAsync(dbContext);

app.MapEndpoints();

app.Run();
