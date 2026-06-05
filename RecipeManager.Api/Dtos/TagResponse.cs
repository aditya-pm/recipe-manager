namespace RecipeManager.Api.Dtos;

public record TagResponse(
    int TagId,
    string TagName,
    List<string> Recipes
);