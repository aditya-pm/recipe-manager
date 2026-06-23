import styles from "./RecipeCard.module.css";

function RecipeCard({ name, categories, tags, imageName = "placeholder_image.png" }) {
  const image = "../../../assets/" + imageName;

  const categories_elements = categories.map((c) => (
    <div key={c} className={styles.category}>{c}</div>
  ));

  const tags_elements = tags.map((t) => <div key={t} className={styles.tag}>{t}</div>);

  return (
    <div className={styles.container}>
      <img src={image} alt="recipe-image" />
      <div className={styles.content}>
        <h3 className="recipe-name">{name}</h3>
        <div className={styles.categories}>{categories_elements}</div>
        <div className={styles.tags}>{tags_elements}</div>
        <div className={styles.actions}>
          <i className="fa-regular fa-heart"></i>
          <i className="fa-regular fa-bookmark"></i>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
