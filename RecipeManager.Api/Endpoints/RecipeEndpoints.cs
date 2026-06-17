using RecipeManager.Api.Data;
using RecipeManager.Api.Dtos;
using Microsoft.EntityFrameworkCore;
using RecipeManager.Api.Models;

public static class RecipeEndpoints
{
    public static void MapRecipeEndpoints(this WebApplication app)
    {
        RouteGroupBuilder recipes = app.MapGroup("/api/recipes");


        recipes.MapGet("/", async (string? search, RecipeManagerContext db) =>
        {
            var query = db.Recipes.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();
                // query = query.Where(r => r.RecipeName.Contains(search));
                query = query.Where(r =>
                    EF.Functions.Like(r.RecipeName, $"%{search}%"));
            }

            var recipes = await query.Select(recipe => new RecipeListResponse(
                recipe.RecipeId,
                recipe.RecipeName
            )).ToListAsync();

            return Results.Ok(recipes);
        });


        recipes.MapGet("/{id}", async (int id, RecipeManagerContext db) =>
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


        recipes.MapPost("/", async (CreateRecipeRequest recipeDto, RecipeManagerContext db) =>
        {
            // Ensure every requested category exists.
            // Missing categories will not be returned by the query below
            // causing the counts to differ.
            var categories = await db.Categories
                .Where(c => recipeDto.Categories.Contains(c.CategoryName))
                .ToListAsync();

            if (categories.Count != recipeDto.Categories.Count)
                return Results.BadRequest("One or more categories do not exist");

            // Similar to categories
            var tags = await db.Tags
                .Where(t => recipeDto.Tags.Contains(t.TagName))
                .ToListAsync();

            if (tags.Count != recipeDto.Tags.Count)
                return Results.BadRequest("One or more tags do not exist");

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


        recipes.MapPut("/{id}", async (int id, CreateRecipeRequest recipeDto, RecipeManagerContext db) =>
        {
            Recipe? recipe = await db.Recipes
                .Include(r => r.Ingredients)
                .Include(r => r.Instructions)
                .Include(r => r.Categories)
                .Include(r => r.Tags)
                .FirstOrDefaultAsync(r => r.RecipeId == id);

            if (recipe is null)
                return Results.NotFound();

            List<Category> categories = await db.Categories
                .Where(c => recipeDto.Categories.Contains(c.CategoryName))
                .ToListAsync();

            if (categories.Count != recipeDto.Categories.Count)
                return Results.BadRequest("One or more categories do not exist");

            List<Tag> tags = await db.Tags
                .Where(t => recipeDto.Tags.Contains(t.TagName))
                .ToListAsync();

            if (tags.Count != recipeDto.Tags.Count)
                return Results.BadRequest("One or more tags do not exist");

            recipe.RecipeName = recipeDto.RecipeName;

            recipe.Ingredients = recipeDto.Ingredients.Select(
                iReponse => new RecipeIngredient
                {
                    Name = iReponse.IngredientName,
                    Quantity = iReponse.Quantity,
                    Unit = iReponse.Unit
                }
            ).ToList();

            recipe.Instructions = recipeDto.Instructions.Select(
                iResponse => new RecipeInstructionStep
                {
                    StepNumber = iResponse.StepNumber,
                    Description = iResponse.Description
                }
            ).ToList();

            recipe.Categories = categories;
            recipe.Tags = tags;

            await db.SaveChangesAsync();
            return Results.NoContent();
        });


        recipes.MapDelete("/{id}", async (int id, RecipeManagerContext db) =>
        {
            var recipe = await db.Recipes.FindAsync(id);

            if (recipe is null)
                return Results.NotFound();

            db.Recipes.Remove(recipe);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        recipes.MapPost("/extract", async (
            ExtractRecipeRequest request, HttpClient httpClient, RecipeManagerContext db) =>
        {
            var categories = await db.Categories
                .Select(c => c.CategoryName)
                .ToListAsync();

            var tags = await db.Tags
                .Select(t => t.TagName)
                .ToListAsync();

            var aiRequest = new
            {
                youtube_url = request.YoutubeUrl,
                categories,
                tags
            };

            var response = await httpClient.PostAsJsonAsync(
                "http://localhost:8000/extract-recipe",
                aiRequest
            );

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                return Results.BadRequest(error);
            }

            var recipe = await response.Content.ReadFromJsonAsync<CreateRecipeRequest>();

            return recipe is not null
                ? Results.Ok(recipe)
                : Results.BadRequest("AI service returned invalid response.");
        });
    }
}