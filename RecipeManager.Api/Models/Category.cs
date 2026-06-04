namespace RecipeManager.Api.Models;

public class Category
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = "";
    public ICollection<Recipe> Recipes { get; set; } = [];
}