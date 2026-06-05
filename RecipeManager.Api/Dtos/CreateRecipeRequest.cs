namespace RecipeManager.Api.Dtos;

// public record CreateRecipeRequest(
//     string RecipeName,
//     List<IngredientResponse> Ingredients,
//     List<InstructionResponse> Instructions,
//     List<string> Categories,
//     List<string> Tags
// );

public record CreateRecipeRequest
{
    public string RecipeName { get; init; } = string.Empty;
    public List<IngredientResponse> Ingredients { get; init; } = [];
    public List<InstructionResponse> Instructions { get; init; } = [];
    public List<string> Categories { get; init; } = [];
    public List<string> Tags { get; init; } = [];
}