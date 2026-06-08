async function loadRecipe() {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get("id");

    const response = await fetch(
        `http://localhost:5274/api/recipes/${recipeId}`
    );
    const recipe = await response.json();

    document.getElementById("recipe-name").textContent = recipe.recipeName;

    const categoryList = document.getElementById("categories");
    for (const category of recipe.categories) {
        const li = document.createElement("li");
        li.textContent = `${category}`
        categoryList.appendChild(li);
    }

    const tagList = document.getElementById("tags");
    for (const tag of recipe.tags) {
        const li = document.createElement("li");
        li.textContent = `${tag}`
        tagList.append(li);
    }

    const ingredientList = document.getElementById("ingredients");
    for (const ingredient of recipe.ingredients) {
        const li = document.createElement("li");

        li.textContent = `${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredientName}`

        ingredientList.appendChild(li);
    }

    const instructionList = document.getElementById("instructions");
    for (const instruction of recipe.instructions) {
        const li = document.createElement("li");

        li.textContent = `${instruction.stepNumber}: ${instruction.description}`

        instructionList.appendChild(li);
    }
}

loadRecipe();