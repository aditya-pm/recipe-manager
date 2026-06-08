async function loadRecipes() {
    const response = await fetch("http://localhost:5274/api/recipes");
    const recipes = await response.json();

    const recipeList = document.getElementById("recipe-list");

    for (const recipe of recipes) {
        const li = document.createElement("li");
        li.textContent = recipe.recipeName;
        recipeList.appendChild(li);

        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            window.location.href = `recipe.html?id=${recipe.recipeId}`
        });
    }
}

loadRecipes();

