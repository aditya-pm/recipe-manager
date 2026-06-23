function RecipeCard({ name, categories, tags, imageName = "placeholder_image.png" }) {
  const image = "../../../assets/" + imageName;

  const categories_elements = categories.map((c) => (
    <div key={c} className="recipe-category">{c}</div>
  ));

  const tags_elements = tags.map((t) => <div key={t} className="recipe-tag">{t}</div>);

  return (
    <div className="recipe-container">
      <img src={image} alt="recipe-image" />
      <div className="recipe-content">
        <h3 className="recipe-name">{name}</h3>
        <div className="recipe-categories">{categories_elements}</div>
        <div className="recipe-tags">{tags_elements}</div>
        <div className="recipe-actions">
          <i className="fa-regular fa-heart"></i>
          <i className="fa-regular fa-bookmark"></i>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
