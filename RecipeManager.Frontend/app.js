// DOM elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const recipesContainer = document.getElementById("recipes");
const resultHeading = document.getElementById("result-heading");
const errorContainer = document.getElementById("error-container");
const recipeDetails = document.getElementById("recipe-details");
const recipeDetailsContent = document.getElementById("recipe-details-content");
const backBtn = document.getElementById("back-btn");

const BASE_URL = "http://localhost:5274/api/";
const SEARCH_URL = `${BASE_URL}recipes?search=`;
const LOOKUP_URL = `${BASE_URL}recipes/`; // get recipe details from id

searchBtn.addEventListener("click", searchMeals);
recipesContainer.addEventListener("click", handleRecipeClick);
backBtn.addEventListener("click", () => recipeDetails.classList.add("hidden"));
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMeals();
});

async function searchMeals() {
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    errorContainer.textContent = "Please enter a search term";
    errorContainer.classList.remove("hidden");
    return;
  }

  try {
    resultHeading.textContent = `Searching "${searchTerm}"...`;
    recipesContainer.innerHTML = "";
    errorContainer.classList.add("hidden");

    const response = await fetch(`${SEARCH_URL}${searchTerm}`);
    const recipesResponseArray = await response.json();

    if (recipesResponseArray.length == 0) {
      resultHeading.textContent = "";
      recipesContainer.innerHTML = "";
      errorContainer.textContent = `No recipes found for "${searchTerm}".
                Try another search term!`;
      errorContainer.classList.remove("hidden");
    } else {
      resultHeading.textContent = `Search results for "${searchTerm}":`;
      await displayRecipes(recipesResponseArray);
      searchInput.value = "";
    }
  } catch (error) {
    errorContainer.textContent =
      "Something went wrong. Please try again later.";
    errorContainer.classList.remove("hidden");
  }
}

async function displayRecipes(recipesResponseArray) {
  recipesContainer.innerHTML = "";
  const recipesArray = await fetchRecipes(recipesResponseArray);

  recipesArray.forEach((recipe) => {
    let recipeTags = "";
    recipe["tags"].forEach((tag) => {
      recipeTags += `<span class="tag">${tag}</span>`;
    });

    let recipeCategories = "";
    recipe["categories"].forEach((category) => {
      recipeCategories += `<span class="category">${category}</span>`
    });

    recipesContainer.innerHTML += `
      <div class="recipe" data-recipe-id="${recipe.recipeId}">
        <div class="recipe-info">
          <h3 class="recipe-title">${recipe.recipeName}</h3>
          <div class="recipe-categories">
            ${recipeCategories}
          </div>
          <div class="recipe-tags">
            ${recipeTags}
          </div>
        </div>
      </div>
    `;
  });
}

async function fetchRecipes(recipesResponseArray) {
  recipesArray = [];
  for (var i = 0; i < recipesResponseArray.length; i++) {
    recipesArray.push(await fetchRecipeById(recipesResponseArray[i].recipeId));
  }
  return recipesArray;
}

async function fetchRecipeById(recipeId) {
  var response = await fetch(`${LOOKUP_URL}${recipeId}`);
  var recipe = response.json();
  return recipe;
}

async function handleRecipeClick(e) {
  const recipeElement = e.target.closest(".recipe");
  if (!recipeElement) return;
  const recipeId = recipeElement.getAttribute("data-recipe-id");
  
  try {
    let recipe = await fetchRecipeById(recipeId);
    if (recipe) {
      const ingredients = recipe["ingredients"];
      const instructions = recipe["instructions"];
      
      recipeDetailsContent.innerHTML = `
        <h2 class="recipe-details-title">${recipe["recipeName"]}</h2>
        <div class="recipe-details-categories">
          ${recipe["categories"].map((c) => `<span class="category">${c}</span>`).join("")}
        </div>
        <div class="recipe-details-tags">
          ${recipe["tags"].map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      `;

      recipeDetails.classList.remove("hidden");
    }
  } catch (error) {

  }
}
