import styles from "./PopularCategories.module.css";
import colors from "./CategoryColors.module.css";

function PopularCategories() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Popular Categories</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span className={`${styles.icon} ${colors.dinner}`}>
            <i className="fa-solid fa-pizza-slice"></i>
          </span>
          <span className={styles.name}>Dinner</span>
          <span className={styles.count}>56</span>
        </li>

        <li className={styles.listItem}>
          <span className={`${styles.icon} ${colors.chicken}`}>
            <i className="fa-solid fa-drumstick-bite"></i>
          </span>
          <span className={styles.name}>Chicken</span>
          <span className={styles.count}>42</span>
        </li>

        <li className={styles.listItem}>
          <span className={`${styles.icon} ${colors.quickEasy}`}>
            <i className="fa-solid fa-forward-fast"></i>
          </span>
          <span className={styles.name}>Quick & Easy</span>
          <span className={styles.count}>38</span>
        </li>

        <li className={styles.listItem}>
          <span className={`${styles.icon} ${colors.indian}`}>
            <i className="fa-solid fa-gopuram"></i>
          </span>
          <span className={styles.name}>Indian</span>
          <span className={styles.count}>35</span>
        </li>

        <li className={styles.listItem}>
          <span className={`${styles.icon} ${colors.highProtein}`}>
            <i className="fa-solid fa-dna"></i>
          </span>
          <span className={styles.name}>High-Protein</span>
          <span className={styles.count}>28</span>
        </li>
      </ul>
      <div className={styles.viewMore}>
        <p>View all categories</p>
        <i className="fa-solid fa-angle-right"></i>
      </div>
    </section>
  );
}

export default PopularCategories;
