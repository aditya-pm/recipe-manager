import styles from "./RecipesPage.module.css";
import Navbar from "../components/Navbar/Navbar";
import RecipeCard from "../components/Recipes/RecipeCard";

function RecipesPage() {
  return (
    <>
      <Navbar />
      <main className={styles.recipePage}>
        <header>
          <h2>All Recipes</h2>
          <p>Browser, search and manage all your recipes in one place.</p>
        </header>

        <section>
          <div className={styles.recipesFilter}>
            <input
              type="text"
              placeholder="Search Recipes By Name..."
              className={styles.nameInput}
            />
            <select name="category" id="" className={styles.dropdown}>
              <option value="cat1">Category 1</option>
              <option value="cat2">Cateogry 2</option>
              <option value="cat3">Cateogry 3</option>
            </select>
            <select name="tag" id="" className={styles.dropdown}>
              <option value="tag1">Tag 1</option>
              <option value="tag2">Tag 2</option>
              <option value="tag3">Tag 3</option>
            </select>
            <div>
              <i class="fa-solid fa-table-cells-large"></i>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>

          <div>48 recipes found</div>

          <div className={styles.grid}>
            <RecipeCard
              name="Chicken Biriyani"
              categories={["Rice & Grains"]}
              tags={["Indian", "High-Protein", "Spicy"]}
              imageName="chicken_biriyani.jpg"
            />
            <RecipeCard
              name="Chicken Hakka Noodles"
              categories={["Pasta & Noodles"]}
              tags={["Chinese", "High-Protein", "Savory"]}
            />
            <RecipeCard
              name="Chicken Soup"
              categories={["Soups & Stews"]}
              tags={["High-Protein", "Easy"]}
            />
            <RecipeCard
              name="Chicken Wrap"
              categories={["Snacks"]}
              tags={["High-Protein", "Quick"]}
            />
            <RecipeCard
              name="Chicken Tacos"
              categories={["Mexican"]}
              tags={["High-Protein", "Spicy"]}
            />
            <RecipeCard
              name="Grilled Chicken"
              categories={["Main Course"]}
              tags={["High-Protein", "Healthy"]}
            />
            <RecipeCard
              name="Butter Chicken"
              categories={["Side Dish"]}
              tags={["High-Protein", "Creamy"]}
            />
            <RecipeCard
              name="Chicken Fried Rice"
              categories={["Rice & Grains"]}
              tags={["Chinese", "Quick"]}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default RecipesPage;
