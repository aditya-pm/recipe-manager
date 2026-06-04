using Microsoft.EntityFrameworkCore;
using RecipeManager.Api.Data;
using RecipeManager.Api.Dtos;
using RecipeManager.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSqlite<RecipeManagerContext>(
    "Data Source=recipes.db"
);

var app = builder.Build();

using var scope = app.Services.CreateAsyncScope();
var dbContext = scope.ServiceProvider.GetRequiredService<RecipeManagerContext>();
await DataSeeder.SeedDatabaseAsync(dbContext);

// GET 
app.MapGet("/", () => "Hello World!");

app.MapGet("/api/categories", async (RecipeManagerContext db) =>
    await db.Categories.ToListAsync()
);

app.MapGet("/api/tags", async (RecipeManagerContext db) =>
    await db.Tags.ToListAsync()
);

app.MapGet("/api/categories/{id}", async (int id, RecipeManagerContext db) =>
    await db.Categories.FindAsync(id)
);

// POST
app.MapPost("/api/recipes", async (CreateRecipeRequest recipeDto, RecipeManagerContext db) =>
{
    var categories = await db.Categories
        .Where(c => recipeDto.Categories.Contains(c.CategoryName))
        .ToListAsync();

    var tags = await db.Tags
        .Where(t => recipeDto.Tags.Contains(t.TagName))
        .ToListAsync();

    var recipe = new Recipe
    {
        RecipeName = recipeDto.RecipeName,
        Ingredients = recipeDto.Ingredients
            .Select((IngredientResponse ingredient) => new RecipeIngredient
            {
                Name = ingredient.IngredientName,
                Quantity = ingredient.Quantity,
                Unit = ingredient.Unit
            })
            .ToList(),
        Instructions = recipeDto.Instructions
            .Select((InstructionResponse instruction) => new RecipeInstructionStep
            {
                StepNumber = instruction.StepNumber,
                Description = instruction.Description
            })
            .ToList(),
        Categories = categories,
        Tags = tags
    };

    await db.Recipes.AddAsync(recipe);
    await db.SaveChangesAsync();
});

app.Run();
