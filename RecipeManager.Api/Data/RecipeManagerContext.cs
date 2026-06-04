using Microsoft.EntityFrameworkCore;
using RecipeManager.Api.Models;

namespace RecipeManager.Api.Data;

public class RecipeManagerContext(DbContextOptions<RecipeManagerContext> options) 
    : DbContext(options)
{
    public DbSet<Recipe> Recipes => Set<Recipe>();
    public DbSet<RecipeIngredient> RecipeIngredients => Set<RecipeIngredient>();
    public DbSet<RecipeInstructionStep> RecipeInstructions => Set<RecipeInstructionStep>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Tag> Tags => Set<Tag>();
}