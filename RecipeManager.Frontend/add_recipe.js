const addRecipeForm = document.getElementById("add-recipe-form");
const recipeNameTextField = document.getElementById("recipe-name");
const categoriesInputContainer = document.getElementById("categories-input-container");
const categoryAddBtn = document.getElementById("add-category-btn");
const tagsInputContainer = document.getElementById("tags-input-container");
const tagAddBtn = document.getElementById("add-tag-btn");
const ingredientsInputContainer = document.getElementById("ingredients-input-container");
const ingredientAddBtn = document.getElementById("add-ingredient-btn");
const instructionsInputContainer = document.getElementById("instructions-input-container");
const instructionAddBtn = document.getElementById("add-instruction-btn");
const saveRecipeBtn = document.getElementById("save-recipe-btn");


categoryAddBtn.addEventListener("click", () => {
  const input = document.createElement("input");

  input.type = "text";
  input.className = "category-input";
  input.placeholder = "Rice & Grains";

  categoriesInputContainer.appendChild(input);
});

tagAddBtn.addEventListener("click", () => {
  const input = document.createElement("input");

  input.type = "text";
  input.className = "tag-input";
  input.placeholder = "High Protein";

  tagsInputContainer.appendChild(input);
});

ingredientAddBtn.addEventListener("click", () => {
  const ingredientRow = document.createElement("div");
  ingredientRow.className = "ingredient-row";

  const ingredientName = document.createElement("input");
  ingredientName.type = "text";
  ingredientName.placeholder = "Name";
  ingredientName.className = "ingredient-name";

  const ingredientQuantity = document.createElement("input");
  ingredientQuantity.type = "number";
  ingredientQuantity.placeholder = "Quantity";
  ingredientQuantity.className = "ingredient-quantity";

  const ingredientUnit = document.createElement("input");
  ingredientUnit.type = "text";
  ingredientUnit.placeholder = "Unit";
  ingredientUnit.className = "ingredient-unit";

  ingredientRow.appendChild(ingredientName);
  ingredientRow.appendChild(ingredientQuantity);
  ingredientRow.appendChild(ingredientUnit);
  ingredientsInputContainer.appendChild(ingredientRow);
});

instructionAddBtn.addEventListener("click", () => {
  const instructionDescription = document.createElement("textarea");
  instructionDescription.className = "instruction-step";
  instructionDescription.placeholder = `Describe step ${instructionsInputContainer.children.length + 1} ...`;
  instructionsInputContainer.appendChild(instructionDescription);
});
