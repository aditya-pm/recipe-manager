namespace RecipeManager.Api.Dtos;

public record CreateRecipeRequest(
    string RecipeName,
    List<IngredientResponse> Ingredients,
    List<InstructionResponse> Instructions,
    List<string> Categories,
    List<string> Tags
);