import styles from "./CategoryChip.module.css";
import colors from "./CategoryColors.module.css";

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
}

function CategoryChip({ categoryName, iconName }) {
  return (
    <div className={styles.chip}>
      <span className={`${styles.icon} ${colors[categoryName.toLowerCase()]}`}>
        <i className={iconName}></i>
      </span>
      <span>{capitalize(categoryName)}</span>
    </div>
  );
}

export default CategoryChip;
