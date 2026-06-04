using RecipeManager.Api.Models;

namespace RecipeManager.Api.Data;

public static class DataSeeder
{
    private static async Task SeedCategoriesAsync(RecipeManagerContext dbContext)
    {
        if (!dbContext.Categories.Any())
        {
            await dbContext.Categories.AddRangeAsync(
                new Category { CategoryName = "Appetizers" },
                new Category { CategoryName = "Beverages" },
                new Category { CategoryName = "Breads"},
                new Category { CategoryName = "Breakfast"},
                new Category { CategoryName = "Main Dishes"}
            );
        }
    }

    private static async Task SeedTagsAsync(RecipeManagerContext dbContext)
    {
        if (!dbContext.Tags.Any())
        {
            await dbContext.Tags.AddRangeAsync(
                new Tag { TagName = "Indian" },
                new Tag { TagName = "Vegetarian" },
                new Tag { TagName = "Grilled"},
                new Tag { TagName = "Spice"},
                new Tag { TagName = "Easy"}
            );
        }
    }

    public static async Task SeedDatabaseAsync(RecipeManagerContext dbContext)
    {
        await SeedCategoriesAsync(dbContext);
        await SeedTagsAsync(dbContext);

        await dbContext.SaveChangesAsync();
    }
}