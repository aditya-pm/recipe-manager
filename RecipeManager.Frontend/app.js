// DOM elements
const searchBox = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const recipeContainer = document.getElementById("recipes");
const resultHeading = document.getElementById("result-heading");
const errorContainer = document.getElementById("error-container");
const recipeDetails = document.getElementById("recipe-details");
const recipeDetailsContent = document.getElementById("recipe-details-content");
const backBtn = document.getElementById("back-btn");

const BASE_URL = "http://localhost:5274/api/";
const SEARCH_URL = `${BASE_URL}`;
const LOOKUP_URL = `${BASE_URL}`;

searchBtn.addEventListener("click", searchMeals);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchMeals()
});

function searchMeals() {
    
}