namespace RecipeManager.Api.Models;

public class Tag
{
    public int TagId { get; set; }
    public string TagName { get; set; } = "";
    public ICollection<Recipe> Recipes { get; set; } = [];
}