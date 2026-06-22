import "./HomePage.css";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import AIRecipe from "../components/AIRecipe/AIRecipe";
import RecipesContainer from "../components/Recipes/RecipesContainer";
import FastCategories from "../components/Categories/FastCategories";
import PopularCategories from "../components/Categories/PopularCategories";

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <div className="content-layout">
          <div className="content-main">
            <Hero />
            <FastCategories />

            <section className="recent-recipes">
              <h2>
                <span>
                  <i className="fa-solid fa-bell-concierge"></i>
                </span>{" "}
                Recently Added
              </h2>

              <RecipesContainer />
            </section>
          </div>

          <aside className="content-sidebar">
            <AIRecipe />
            <PopularCategories />
          </aside>
        </div>
      </main>
    </>
  );
}

export default HomePage;
