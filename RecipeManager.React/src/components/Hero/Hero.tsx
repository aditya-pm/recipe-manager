import "./Hero.css";
import heroImage from "../../../assets/chicken_biriyani.jpg";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h2 className="hero-title">
          Discover & organize <span>your favourite recipes</span>
        </h2>
        <p>
          Keep all your recipes in one place and find the perfect meal for any
          occasion
        </p>
        <button id="browse-recipe-btn">
          <i className="fa-solid fa-magnifying-glass"></i> Browse Recipes
        </button>
      </div>
      <div className="hero-img">
        <img src={heroImage} alt="some-dish-image" />
      </div>
    </section>
  );
}

export default Hero;