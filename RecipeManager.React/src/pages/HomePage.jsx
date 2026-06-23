import styles from "./HomePage.module.css";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import AIRecipe from "../components/AIRecipe/AIRecipe";
import RecentRecipes from "../components/Recipes/RecentRecipes";
import FastCategories from "../components/Categories/FastCategories";
import PopularCategories from "../components/Categories/PopularCategories";

function HomePage() {
  return (
    <>
      <Navbar />

      <main className={styles.homePage}>
        <div className={styles.contentLayout}>
          <div className={styles.contentMain}>
            <Hero />
            <FastCategories />
            <RecentRecipes />
          </div>

          <aside className={styles.contentSidebar}>
            <AIRecipe />
            <PopularCategories />
          </aside>
        </div>
      </main>
    </>
  );
}

export default HomePage;
