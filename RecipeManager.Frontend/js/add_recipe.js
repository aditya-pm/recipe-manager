import { ADD_RECIPE_URL, LOOKUP_URL } from "./config.js";

// DOM REFERENCES
const addRecipeForm = document.getElementById("add-recipe-form");
const recipeNameTextField = document.getElementById("recipe-name");
const categoriesInputContainer = document.getElementById(
  "categories-input-container",
);
const categoryAddBtn = document.getElementById("add-category-btn");
const tagsInputContainer = document.getElementById("tags-input-container");
const tagAddBtn = document.getElementById("add-tag-btn");
const ingredientsInputContainer = document.getElementById(
  "ingredients-input-container",
);
const ingredientAddBtn = document.getElementById("add-ingredient-btn");
const instructionsInputContainer = document.getElementById(
  "instructions-input-container",
);
const instructionAddBtn = document.getElementById("add-instruction-btn");
const saveRecipeBtn = document.getElementById("save-recipe-btn");

// URL PARAMS
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");
const isEditMode = recipeId !== null;

// EVENT LISTENERS
categoryAddBtn.addEventListener("click", () => addCategoryInput());
tagAddBtn.addEventListener("click", () => addTagInput());
ingredientAddBtn.addEventListener("click", () => addIngredientInput());
instructionAddBtn.addEventListener("click", () => addInstructionInput());

addRecipeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const categories = Array.from(
    addRecipeForm.querySelectorAll(".category-input"),
  )
    .map((categoryElement) => categoryElement.value.trim())
    .filter((category) => category !== "");

  const tags = Array.from(addRecipeForm.querySelectorAll(".tag-input"))
    .map((tagElement) => tagElement.value.trim())
    .filter((tag) => tag !== "");

  const ingredients = Array.from(
    addRecipeForm.querySelectorAll(".ingredient-row"),
  )
    .map((row) => ({
      ingredientName: row.querySelector(".ingredient-name").value.trim(),
      quantity: Number(row.querySelector(".ingredient-quantity").value.trim()),
      unit: row.querySelector(".ingredient-unit").value.trim(),
    }))
    .filter((i) => i.ingredientName !== "" && i.quantity > 0 && i.unit !== "");

  const instructions = Array.from(
    addRecipeForm.querySelectorAll(".instruction-step"),
  )
    .filter((step) => step.value.trim() !== "")
    .map((step, index) => ({
      stepNumber: index + 1,
      description: step.value.trim(),
    }));

  const recipe = {
    recipeName: recipeNameTextField.value.trim(),
    ingredients,
    instructions,
    categories,
    tags,
  };

  try {
    const url = isEditMode ? `${LOOKUP_URL}${recipeId}` : ADD_RECIPE_URL;
    const method = isEditMode ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      alert(errorMessage);
      return;
    }

    window.location.href = "./index.html";
    alert(isEditMode ? "Recipe updated!" : "Recipe created!");
  } catch (error) {
    console.error(error);
  }
});

// HELPERS
async function fetchRecipeById(recipeId) {
  let response = await fetch(`${LOOKUP_URL}${recipeId}`);
  const recipe = await response.json();
  return recipe;
}

function addCategoryInput(value = "") {
  const input = document.createElement("input");

  input.type = "text";
  input.className = "category-input";
  input.placeholder = "Rice & Grains";
  input.value = value;

  categoriesInputContainer.appendChild(input);
}

function addTagInput(value = "") {
  const input = document.createElement("input");

  input.type = "text";
  input.className = "tag-input";
  input.placeholder = "High-Protein";
  input.value = value;

  tagsInputContainer.appendChild(input);
}

function addIngredientInput(ingredient = null) {
  const ingredientRow = document.createElement("div");
  ingredientRow.className = "ingredient-row";

  const ingredientName = document.createElement("input");
  ingredientName.type = "text";
  ingredientName.placeholder = "Name";
  ingredientName.className = "ingredient-name";
  if (ingredient) ingredientName.value = ingredient.ingredientName;

  const ingredientQuantity = document.createElement("input");
  ingredientQuantity.type = "number";
  ingredientQuantity.placeholder = "Quantity";
  ingredientQuantity.className = "ingredient-quantity";
  if (ingredient) ingredientQuantity.value = ingredient.quantity;

  const ingredientUnit = document.createElement("input");
  ingredientUnit.type = "text";
  ingredientUnit.placeholder = "Unit";
  ingredientUnit.className = "ingredient-unit";
  if (ingredient) ingredientUnit.value = ingredient.unit;

  ingredientRow.appendChild(ingredientName);
  ingredientRow.appendChild(ingredientQuantity);
  ingredientRow.appendChild(ingredientUnit);
  ingredientsInputContainer.appendChild(ingredientRow);
}

function addInstructionInput(desc = null) {
  const instructionDescription = document.createElement("textarea");
  instructionDescription.className = "instruction-step";

  if (desc) instructionDescription.value = desc;
  else
    instructionDescription.placeholder = `Describe step ${instructionsInputContainer.children.length + 1} ...`;

  instructionsInputContainer.appendChild(instructionDescription);
}

function populateForm(recipe) {
  recipeNameTextField.value = recipe.recipeName;

  categoriesInputContainer.innerHTML = "";
  recipe.categories.forEach((category) => addCategoryInput(category));

  tagsInputContainer.innerHTML = "";
  recipe.tags.forEach((tag) => addTagInput(tag));

  ingredientsInputContainer.innerHTML = "";
  recipe.ingredients.forEach((ingredient) => addIngredientInput(ingredient));

  instructionsInputContainer.innerHTML = "";
  recipe.instructions.forEach((i) => addInstructionInput(i.description));
}

// ENTRY POINT
async function initializePage() {
  if (!isEditMode) return;

  const recipe = await fetchRecipeById(recipeId);
  populateForm(recipe);

  document.querySelector("h1").textContent = "Edit Recipe";
  saveRecipeBtn.textContent = "Update Recipe";
}

initializePage();
