using RecipeManager.Api.Data;
using RecipeManager.Api.Dtos;
using Microsoft.EntityFrameworkCore;
using RecipeManager.Api.Models;

public static class CategoryEndpoints
{
    public static void MapCategoryEndpoints(this WebApplication app)
    {
        RouteGroupBuilder categories = app.MapGroup("/api/categories");


        categories.MapGet("/", async (RecipeManagerContext db) =>
            await db.Categories.Select(
                category => new
                {
                    category.CategoryId,
                    category.CategoryName
                }
            ).ToListAsync()
        );


        categories.MapGet("/{id}", async (int id, RecipeManagerContext db) =>
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


        categories.MapPost("/", async (CreateCategoryRequest categoryDto, RecipeManagerContext db) =>
        {
            Category category = new() { CategoryName = categoryDto.CategoryName };
            await db.Categories.AddAsync(category);
            await db.SaveChangesAsync();
            return Results.Created($"/api/categories/{category.CategoryId}", new CategoryResponse(
                category.CategoryId, category.CategoryName, []
            ));
        });


        categories.MapPut("/{id}", async (
            int id,
            CreateCategoryRequest categoryDto,
            RecipeManagerContext db) =>
        {
            Category? category = await db.Categories.FindAsync(id);

            if (category is null)
                return Results.NotFound();

            category.CategoryName = categoryDto.CategoryName;
            await db.SaveChangesAsync();
            return Results.NoContent();
        });


        categories.MapDelete("/{id}", async (int id, RecipeManagerContext db) =>
        {
            Category? category = await db.Categories.FindAsync(id);

            if (category is null)
                return Results.NotFound();

            db.Categories.Remove(category);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}
