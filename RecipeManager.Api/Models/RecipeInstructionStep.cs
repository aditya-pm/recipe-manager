namespace RecipeManager.Api.Models;

public class RecipeInstructionStep
{
    public int RecipeInstructionStepId { get; set; }
    public int RecipeId { get; set; }
    public Recipe Recipe { get; set; } = null!;
    public int StepNumber { get; set; }
    public string Description { get; set; } = "";
}