function PopularCategories() {
  return (
    <section className="popular-categories-section">
      <h2 className="popular-categories-title">Popular Categories</h2>
      <ul id="popular-categories-list">
        <li className="category-row">
          <span className="cat-icon cat-dinner">
            <i className="fa-solid fa-pizza-slice"></i>
          </span>
          <span className="category-name">Dinner</span>
          <span className="recipe-count">56</span>
        </li>

        <li className="category-row">
          <span className="cat-icon cat-chicken">
            <i className="fa-solid fa-drumstick-bite"></i>
          </span>
          <span className="category-name">Chicken</span>
          <span className="recipe-count">42</span>
        </li>

        <li className="category-row">
          <span className="cat-icon cat-quick-easy">
            <i className="fa-solid fa-forward-fast"></i>
          </span>
          <span className="category-name">Quick & Easy</span>
          <span className="recipe-count">38</span>
        </li>

        <li className="category-row">
          <span className="cat-icon cat-indian">
            <i className="fa-solid fa-gopuram"></i>
          </span>
          <span className="category-name">Indian</span>
          <span className="recipe-count">35</span>
        </li>

        <li className="category-row">
          <span className="cat-icon cat-high-protein">
            <i className="fa-solid fa-dna"></i>
          </span>
          <span className="category-name">High-Protein</span>
          <span className="recipe-count">28</span>
        </li>
      </ul>
      <div className="view-more">
        <p>View all categories</p>
        <i className="fa-solid fa-angle-right"></i>
      </div>
    </section>
  );
}

export default PopularCategories;