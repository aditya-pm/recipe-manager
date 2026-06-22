import "./AIRecipe.css";

function AIRecipe() {
  return (
    <section className="ai-recipe">
      <h2>
        <i className="fa-solid fa-wand-magic-sparkles"></i> AI Recipe Extractor
      </h2>
      <p class="ai-desc">Extract recipes from YouTube videos in seconds!</p>
      <img
        id="ai-recipe-image"
        src="../assets/youtube_wand.png"
        alt="browser-youtube-window-magic-wand"
      />
      <div id="ai-actions">
        <input type="text" placeholder="Paste YouTube URL here..." />
        <button>Extract Recipe</button>
      </div>
      <p className="ai-info">
        <i className="fa-solid fa-circle-info"></i>
        Our AI will automatically extract the ingredients, steps, and more!
      </p>
    </section>
  );
}

export default AIRecipe;
