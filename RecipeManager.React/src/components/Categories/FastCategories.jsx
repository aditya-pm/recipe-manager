import "./FastCategories.css";
import CategoryChip from "./CategoryChip";

function FastCategories() {
  return (
    <section className="categories">
      <CategoryChip
        categoryName="breakfast"
        iconName="fa-solid fa-bread-slice"
      />
      <CategoryChip categoryName="lunch" iconName="fa-solid fa-bowl-food" />
      <CategoryChip categoryName="dinner" iconName="fa-solid fa-pizza-slice" />
      <CategoryChip categoryName="snacks" iconName="fa-solid fa-cookie" />
      <CategoryChip categoryName="desserts" iconName="fa-solid fa-cheese" />
      <CategoryChip
        categoryName="beverages"
        iconName="fa-solid fa-beer-mug-empty"
      />
      <div id="view-more-categories" className="chip">
        <i className="fa-solid fa-border-all"></i> View All
      </div>
    </section>
  );
}

export default FastCategories;
