namespace RecipeManager.Api.Models;

public class RecipeIngredient
{
    public int RecipeId { get; set; }
    public int RecipeIngredientId { get; set; }
    public Recipe Recipe { get; set; } = null!;
    public string Name { get; set; } = "";
    public decimal Quantity { get; set; }
    public string Unit { get; set; } = "";
}