import "./Navbar.css";

function Navbar() {
  return (
    <header id="navbar">
      <h1 id="logo-title">
        <i className="fas fa-utensils"></i> Recipe Manager
      </h1>

      <nav id="nav-pages">
        <a href="index.html">Home</a>
        <a href="recipes.html">Recipes</a>
        <a href="categories.html">Categories</a>
        <a href="tags.html">Tags</a>
        <a href="favourites.html">Favourites</a>
      </nav>

      <div id="nav-actions">
        <input type="text" placeholder="Search Recipes..." />
        <button id="add-recipe-btn">+ Add Recipe</button>
      </div>
    </header>
  );
}

export default Navbar;
