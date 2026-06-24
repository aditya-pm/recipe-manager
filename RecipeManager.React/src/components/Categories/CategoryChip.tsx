import styles from "./CategoryChip.module.css";
import colors from "./CategoryColors.module.css";

type CategoryChipProps = {
  categoryName: string;
  iconName: string;
};

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
}

function CategoryChip({ categoryName, iconName }: CategoryChipProps) {
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
