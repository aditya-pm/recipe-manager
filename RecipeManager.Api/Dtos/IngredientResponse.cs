namespace RecipeManager.Api.Dtos;

public record IngredientResponse(
    string IngredientName,
    decimal Quantity,
    string Unit
);