import "./RecentRecipes.css";
import RecipeCard from "./RecipeCard";

function RecipesContainer() {
  return (
    <div className="recipes-grid">
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </div>
  );
}

export default RecipesContainer;
