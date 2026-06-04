namespace RecipeManager.Api.Models;

public class Recipe
{
    public int RecipeId { get; set; }
    public string RecipeName { get; set; } = "";
    public ICollection<RecipeIngredient> Ingredients { get; set; } = [];
    public ICollection<RecipeInstructionStep> Instructions { get; set; } = [];
    public ICollection<Category> Categories { get; set; } = [];
    public ICollection<Tag> Tags { get; set; } = [];
}
