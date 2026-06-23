import RecipeCard from "./RecipeCard";
import styles from "./RecentRecipes.module.css";

function RecentRecipes() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.icon}>
          <i className="fa-solid fa-bell-concierge"></i>
        </span>{" "}
        Recently Added
      </h2>

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
  );
}

export default RecentRecipes;
