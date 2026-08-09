import "../styles/tram.css";

export function startHomeTram() {
  const background =
    document.querySelector(".homepage-background");

  if (!background) return;

  const existing =
    background.querySelector(".home-tram-layer");

  if (existing) return;

  const tramLayer = document.createElement("div");

  tramLayer.className = "home-tram-layer";

  tramLayer.innerHTML = `
    <div class="home-tram-track">
      <div class="home-tram-rail home-tram-rail--top"></div>
      <div class="home-tram-rail home-tram-rail--bottom"></div>
    </div>

    <div class="home-tram">

      <div class="home-tram-body">

        <div class="home-tram-front">
          <span class="home-tram-light"></span>
        </div>

        <div class="home-tram-windows">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="home-tram-back"></div>

      </div>

    </div>
  `;

  /*
    Add tram to the SAME container as
    background / buildings / grid.
  */
  background.appendChild(tramLayer);
}