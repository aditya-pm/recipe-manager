namespace RecipeManager.Api.Dtos;

public record CategoryResponse(
    int CategoryId,
    string CategoryName,
    List<string> RecipeNames
);