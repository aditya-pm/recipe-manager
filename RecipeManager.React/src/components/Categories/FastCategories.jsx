function FastCategories() {
  return (
    <section className="categories">
      <div className="category-chip">
        <span className="cat-icon cat-breakfast">
          <i className="fa-solid fa-bread-slice"></i>
        </span>
        <span className="text">Breakfast</span>
      </div>
      <div className="category-chip">
        <span className="cat-icon cat-lunch">
          <i className="fa-solid fa-bowl-food"></i>
        </span>
        <span className="text">Lunch</span>
      </div>
      <div className="category-chip">
        <span className="cat-icon cat-dinner">
          <i className="fa-solid fa-pizza-slice"></i>
        </span>
        <span className="text">Dinner</span>
      </div>
      <div className="category-chip">
        <span className="cat-icon cat-snacks">
          <i className="fa-solid fa-cookie"></i>
        </span>
        <span className="text">Snacks</span>
      </div>
      <div className="category-chip">
        <span className="cat-icon cat-desserts">
          <i className="fa-solid fa-cheese"></i>
        </span>
        <span className="text">Desserts</span>
      </div>
      <div className="category-chip">
        <span className="cat-icon cat-beverages">
          <i className="fa-solid fa-beer-mug-empty"></i>
        </span>
        <span className="text">Beverages</span>
      </div>
      <div id="view-more-categories" className="category-chip">
        <i className="fa-solid fa-border-all"></i> View All
      </div>
    </section>
  );
}

export default FastCategories;