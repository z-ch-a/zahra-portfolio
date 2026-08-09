import "../styles/background.css";

export function createBackground() {
  const background = document.createElement("div");
  background.className = "homepage-background";

  background.innerHTML = `
    <div class="homepage-layer homepage-layer--back">
      <img
        src="/homepage/background.png"
        alt=""
        draggable="false"
      />
    </div>

    <div class="homepage-layer homepage-layer--buildings">
      <img
        src="/homepage/buildings.png"
        alt=""
        draggable="false"
      />
    </div>

    <div class="homepage-layer homepage-layer--grid">
      <img
        src="/homepage/grid.png"
        alt=""
        draggable="false"
      />
    </div>
  `;

  return background;
}

export default createBackground;