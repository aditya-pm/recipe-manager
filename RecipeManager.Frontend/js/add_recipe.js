import { ADD_RECIPE_URL } from "./config.js";

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

addRecipeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const categories = Array.from(document.querySelectorAll(".category-input"))
    .map((categoryElement) => categoryElement.value.trim())
    .filter((category) => category !== "");

  const tags = Array.from(document.querySelectorAll(".tag-input"))
    .map((tagElement) => tagElement.value.trim())
    .filter((tag) => tag !== "");

  const ingredients = Array.from(document.querySelectorAll(".ingredient-row"))
    .map((row) => ({
      ingredientName: row.querySelector(".ingredient-name").value.trim(),
      quantity: Number(row.querySelector(".ingredient-quantity").value.trim()),
      unit: row.querySelector(".ingredient-unit").value.trim(),
    }))
    .filter((i) => i.ingredientName !== "" && i.quantity > 0 && i.unit !== "");

  const instructions = Array.from(
    document.querySelectorAll(".instruction-step"),
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
    const response = await fetch(ADD_RECIPE_URL, {
      method: "POST",
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

    alert("Recipe created!");
  } catch (error) {
    console.error(error);
  }
});
