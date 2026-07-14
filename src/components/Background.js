export function createBackground() {
  
function seededRandom(seed) {
  let value = seed % 2147483647;

  if (value <= 0) {
    value += 2147483646;
  }

  return function random() {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

const starCount = 90;

/* Create only one generator */
const random = seededRandom(84729);

const stars = Array.from({ length: starCount }, () => {
  const left = 2 + random() * 96;
  const top = 2 + random() * 52;

  const sizeRoll = random();

  let size = 1;

  if (sizeRoll > 0.94) {
    size = 3;
  } else if (sizeRoll > 0.72) {
    size = 2;
  }

  const delay = (random() * 5).toFixed(2);
  const duration = (3.2 + random() * 4).toFixed(2);

  return {
    left: left.toFixed(2),
    top: top.toFixed(2),
    size,
    delay,
    duration,
  };
});

  const crossStars = [
    { left: 8, top: 12, delay: 0.5 },
    { left: 19, top: 28, delay: 2.1 },
    { left: 34, top: 8, delay: 1.2 },
    { left: 52, top: 19, delay: 3.1 },
    { left: 68, top: 7, delay: 1.8 },
    { left: 83, top: 24, delay: 0.9 },
    { left: 94, top: 10, delay: 2.7 },
  ];

  const clouds = [
    { left: 3, top: 18, width: 23, delay: 0 },
    { left: 27, top: 29, width: 18, delay: 3 },
    { left: 52, top: 17, width: 25, delay: 5 },
    { left: 77, top: 31, width: 20, delay: 1 },
  ];

  const distantBuildings = [
    { left: -2, width: 4, height: 166, type: "block" },
    { left: 1, width: 4, height: 172, type: "tower" },
    { left: 4, width: 5, height: 90, type: "step" },
    { left: 6, width: 3, height: 200, type: "step" },
    { left: 8, width: 3, height: 134, type: "skyscraper" },
    { left: 10, width: 6, height: 180, type: "skyscraper" },
    { left: 11, width: 5, height: 120, type: "block" },
    { left: 15, width: 4, height: 143, type: "narrow" },
    { left: 18, width: 5, height: 172, type: "step" },
    { left: 22, width: 3, height: 148, type: "skyscraper" },
    { left: 25, width: 5, height: 100, type: "tower" },
    { left: 29, width: 4, height: 126, type: "narrow" },
    { left: 32, width: 5, height: 182, type: "block" },
    { left: 34, width: 4, height: 100, type: "block" },
    { left: 36, width: 3, height: 158, type: "skyscraper" },
    { left: 39, width: 5, height: 108, type: "step" },
    { left: 43, width: 4, height: 138, type: "tower" },
    { left: 46, width: 5, height: 190, type: "block" },
    { left: 50, width: 3, height: 170, type: "skyscraper" },
    { left: 51, width: 5, height: 200, type: "skyscraper" },
    { left: 53, width: 5, height: 112, type: "narrow" },
    { left: 57, width: 4, height: 144, type: "tower" },
    { left: 62, width: 4, height: 110, type: "block" },
    { left: 64, width: 3, height: 162, type: "skyscraper" },
    { left: 67, width: 5, height: 104, type: "block" },
    { left: 71, width: 4, height: 132, type: "narrow" },
    { left: 73, width: 3, height: 150, type: "narrow" },
    { left: 75, width: 5, height: 92, type: "step" },
    { left: 78, width: 3, height: 176, type: "skyscraper" },
    { left: 81, width: 5, height: 118, type: "tower" },
    { left: 85, width: 4, height: 146, type: "narrow" },
    { left: 88, width: 5, height: 86, type: "block" },
    { left: 90, width: 5, height: 200, type: "skyscraper" },
    { left: 92, width: 3, height: 154, type: "skyscraper" },
    { left: 95, width: 5, height: 110, type: "step" },
    { left: 96, width: 4, height: 200, type: "tower" },
    { left: 99, width: 4, height: 136, type: "tower" },
  ];

  const mainBuildings = [
    {
      left: -1,
      width: 7,
      height: 82,
      type: "step",
      windows: "cyan",
    },
    {
      left: 5,
      width: 7,
      height: 120,
      type: "tower",
      windows: "white",
    },
    {
      left: 12,
      width: 8,
      height: 96,
      type: "block",
      windows: "blue",
    },
    {
      left: 20,
      width: 7,
      height: 146,
      type: "antenna",
      windows: "cyan",
    },
    {
      left: 28,
      width: 8,
      height: 105,
      type: "step",
      windows: "white",
    },
    {
      left: 36,
      width: 7,
      height: 138,
      type: "narrow",
      windows: "blue",
    },
    {
      left: 44,
      width: 8,
      height: 98,
      type: "block",
      windows: "cyan",
    },
    {
      left: 52,
      width: 7,
      height: 154,
      type: "antenna",
      windows: "white",
    },
    {
      left: 60,
      width: 8,
      height: 110,
      type: "step",
      windows: "blue",
    },
    {
      left: 68,
      width: 7,
      height: 132,
      type: "tower",
      windows: "cyan",
    },
    {
      left: 76,
      width: 8,
      height: 100,
      type: "block",
      windows: "white",
    },
    {
      left: 84,
      width: 7,
      height: 142,
      type: "narrow",
      windows: "blue",
    },
    {
      left: 92,
      width: 7,
      height: 112,
      type: "step",
      windows: "cyan",
    },
    {
      left: 99,
      width: 5,
      height: 88,
      type: "block",
      windows: "white",
    },
  ];

  const starMarkup = stars
    .map(
      (star) => `
        <span
          class="city-star"
          style="
            --star-left: ${star.left}%;
            --star-top: ${star.top}%;
            --star-size: ${star.size}px;
            --star-delay: ${star.delay}s;
            --star-duration: ${star.duration}s;
          "
        ></span>
      `
    )
    .join("");

  const crossStarMarkup = crossStars
    .map(
      (star) => `
        <span
          class="city-cross-star"
          style="
            --star-left: ${star.left}%;
            --star-top: ${star.top}%;
            --star-delay: ${star.delay}s;
          "
        ></span>
      `
    )
    .join("");

  const cloudMarkup = clouds
    .map(
      (cloud) => `
        <div
          class="pixel-cloud"
          style="
            --cloud-left: ${cloud.left}%;
            --cloud-top: ${cloud.top}%;
            --cloud-width: ${cloud.width}vw;
            --cloud-delay: ${cloud.delay}s;
          "
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      `
    )
    .join("");

  function createBuildingMarkup(
    buildings,
    layerClass,
    includeWindows = false
  ) {
    return buildings
      .map(
        (building, index) => `
          <div
            class="
              city-building
              ${layerClass}
              city-building--${building.type}
              ${
                includeWindows
                  ? `city-building--windows-${building.windows}`
                  : ""
              }
            "
            style="
              --building-left: ${building.left}%;
              --building-width: ${building.width}%;
              --building-height: ${building.height}px;
              --building-delay: ${(index * 0.41).toFixed(2)}s;
            "
          >
            ${
              building.type === "antenna"
                ? `<span class="city-antenna"></span>`
                : ""
            }

            ${
              includeWindows
                ? `<div class="city-windows"></div>`
                : ""
            }
          </div>
        `
      )
      .join("");
  }

  const distantCityMarkup = createBuildingMarkup(
    distantBuildings,
    "city-building--distant"
  );

  const mainCityMarkup = createBuildingMarkup(
    mainBuildings,
    "city-building--main",
    true
  );

  const bridgeSupports = Array.from(
    { length: 22 },
    (_, index) => `
      <span
        class="railway-support"
        style="--support-left: ${(index / 21) * 100}%"
      ></span>
    `
  ).join("");

  return `
    <div class="home-background" aria-hidden="true">
      <div class="pixel-sky">
        <div class="city-stars">
          ${starMarkup}
          ${crossStarMarkup}
        </div>

        <div class="city-clouds">
          ${cloudMarkup}
        </div>

        <div class="sunset-band"></div>
      </div>

      <div class="distant-city-layer">
        ${distantCityMarkup}
      </div>

      <div class="pixel-moon"></div>

      <div class="railway-background-layer">
        <div class="railway-track">
          <span class="railway-line railway-line--top"></span>
          <span class="railway-line railway-line--bottom"></span>
        </div>

        <div class="railway-supports">
          ${bridgeSupports}
        </div>

        <div class="pixel-tram">
          <div class="tram-body">
            <div class="tram-windows">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <span class="tram-headlight"></span>
          </div>

          <span class="tram-wheel tram-wheel--left"></span>
          <span class="tram-wheel tram-wheel--right"></span>
        </div>
      </div>

      <div class="main-city-layer">
        ${mainCityMarkup}
      </div>

      <div class="main-city-base"></div>
      <div class="city-ground-line"></div>

      <div class="home-grid"></div>

      <div class="home-vignette"></div>
      <div class="home-scanlines"></div>
    </div>
  `;
}