import chickenBiriyani from "../../../assets/chicken_biriyani.jpg";

function RecipeCard() {
  return (
    <div className="recipe-container">
      <img src={chickenBiriyani} alt="recipe-image" />
      <div className="recipe-content">
        <h3 className="recipe-name">Chicken Biriyani</h3>
        <div className="recipe-categories">
          <div className="recipe-category">Rice & Grains</div>
        </div>
        <div className="recipe-tags">
          <div className="recipe-tag">Indian</div>
          <div className="recipe-tag">High-Protein</div>
          <div className="recipe-tag">Spicy</div>
        </div>
        <div className="recipe-actions">
          <i className="fa-regular fa-heart"></i>
          <i className="fa-regular fa-bookmark"></i>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
