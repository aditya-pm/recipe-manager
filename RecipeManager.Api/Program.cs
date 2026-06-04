using RecipeManager.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSqlite<RecipeManagerContext>(
    "Data Source=recipes.db"
);

var app = builder.Build();


app.MapGet("/", () => "Hello World!");


app.Run();
