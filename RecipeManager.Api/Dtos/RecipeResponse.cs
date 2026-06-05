namespace RecipeManager.Api.Dtos;

public record RecipeResponse(
    int RecipeId,
    string RecipeName,
    List<IngredientResponse> Ingredients,
    List<InstructionResponse> Instructions,
    List<string> Categories,
    List<string> Tags
);
