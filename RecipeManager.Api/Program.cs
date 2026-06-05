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
    await db.Categories.Select(
        category => new
        {
            category.CategoryId,
            category.CategoryName
        }
    ).ToListAsync()
);

app.MapGet("/api/tags", async (RecipeManagerContext db) =>
    await db.Tags.Select(
        tag => new
        {
            tag.TagId,
            tag.TagName
        }
    ).ToListAsync()
);

app.MapGet("/api/categories/{id}", async (int id, RecipeManagerContext db) =>
{
    Category? category = await db.Categories
        .Include(c => c.Recipes)
        .FirstOrDefaultAsync(c => c.CategoryId == id);

    if (category is null)
    {
        return Results.NotFound();
    }

    return Results.Ok(
        new CategoryResponse(
            category.CategoryId,
            category.CategoryName,
            category.Recipes.Select(
                recipe => recipe.RecipeName
            ).ToList()
        )
    );
});

app.MapGet("/api/tags/{id}", async (int id, RecipeManagerContext db) =>
{
    Tag? tag = await db.Tags
        .Include(t => t.Recipes)
        .FirstOrDefaultAsync(t => t.TagId == id);

    if (tag is null)
    {
        return Results.NotFound();
    }

    return Results.Ok(
        new TagResponse(
            tag.TagId,
            tag.TagName,
            tag.Recipes.Select(
                r => r.RecipeName
            ).ToList()
        )
    );
});

app.MapGet("/api/recipes/{id}", async (int id, RecipeManagerContext db) =>
{
    var recipe = await db.Recipes
        .Include(recipe => recipe.Ingredients)
        .Include(recipe => recipe.Instructions)
        .Include(recipe => recipe.Categories)
        .Include(recipe => recipe.Tags)
        .FirstOrDefaultAsync(recipe => recipe.RecipeId == id);

    if (recipe is null)
    {
        return Results.NotFound();
    }

    var response = new RecipeResponse(
        recipe.RecipeId,
        recipe.RecipeName,
        recipe.Ingredients.Select(
            i => new IngredientResponse(
                i.Name,
                i.Quantity,
                i.Unit
            )
        ).ToList(),
        recipe.Instructions.Select(
            i => new InstructionResponse(
                i.StepNumber,
                i.Description
            )
        ).ToList(),
        recipe.Categories.Select(
            c => c.CategoryName
        ).ToList(),
        recipe.Tags.Select(
            t => t.TagName
        ).ToList()
    );

    return Results.Ok(response);
});

app.MapGet("/api/recipes", async (RecipeManagerContext db) =>
{
    var recipes = await db.Recipes.Select(recipe => new
    {
        recipe.RecipeId,
        recipe.RecipeName
    }).ToListAsync();

    return Results.Ok(recipes);
});

// POST
app.MapPost("/api/recipes", async (CreateRecipeRequest recipeDto, RecipeManagerContext db) =>
{
    // Ensure every requested category exists.
    // Missing categories will not be returned by the query below
    // causing the counts to differ.
    var categories = await db.Categories
        .Where(c => recipeDto.Categories.Contains(c.CategoryName))
        .ToListAsync();

    if (categories.Count != recipeDto.Categories.Count)
    {
        return Results.BadRequest("One or more categories do not exist");
    }

    // Similar to categories
    var tags = await db.Tags
        .Where(t => recipeDto.Tags.Contains(t.TagName))
        .ToListAsync();

    if (tags.Count != recipeDto.Tags.Count)
    {
        return Results.BadRequest("One or more tags do not exist");
    }

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

    return Results.Created($"/api/recipes/{recipe.RecipeId}", new RecipeResponse(
        recipe.RecipeId,
        recipe.RecipeName,
        recipe.Ingredients.Select(
            ingredient => new IngredientResponse(
                ingredient.Name,
                ingredient.Quantity,
                ingredient.Unit
            )
        ).ToList(),
        recipe.Instructions.Select(
            instruction => new InstructionResponse(
                instruction.StepNumber,
                instruction.Description
            )
        ).ToList(),
        recipe.Categories.Select(category => category.CategoryName).ToList(),
        recipe.Tags.Select(tag => tag.TagName).ToList()
    ));
});

// DELETE
app.MapDelete("/api/recipes/{id}", async (int id, RecipeManagerContext db) =>
{
    var recipe = await db.Recipes.FindAsync(id);
    if (recipe is null)
    {
        return Results.NotFound();
    }
    db.Recipes.Remove(recipe);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
