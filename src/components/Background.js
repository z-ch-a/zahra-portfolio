export function createBackground() {
  const smallStars = Array.from(
    { length: 24 },
    (_, index) => {
      const left =
        3 + ((index * 37) % 94);

      const top =
        7 + ((index * 53) % 61);

      const delay =
        ((index * 0.37) % 3).toFixed(2);

      const duration =
        (
          2.8 +
          ((index * 0.23) % 2.3)
        ).toFixed(2);

      return `
        <span
          class="home-star home-star--small"
          style="
            --star-left: ${left}%;
            --star-top: ${top}%;
            --star-delay: ${delay}s;
            --star-duration: ${duration}s;
          "
        ></span>
      `;
    }
  ).join("");

  const crossStars = [
    {
      left: 18,
      top: 22,
      delay: 0.2,
    },
    {
      left: 78,
      top: 30,
      delay: 1.3,
    },
  ]
    .map(
      (star) => `
        <span
          class="home-star home-star--cross"
          style="
            --star-left: ${star.left}%;
            --star-top: ${star.top}%;
            --star-delay: ${star.delay}s;
          "
        ></span>
      `
    )
    .join("");

  const buildings = [
    {
      left: 0,
      width: 5,
      height: 54,
      type: "low",
    },
    {
      left: 4,
      width: 7,
      height: 106,
      type: "tower",
    },
    {
      left: 10,
      width: 5,
      height: 62,
      type: "stepped",
    },
    {
      left: 15,
      width: 9,
      height: 86,
      type: "wide",
    },
    {
      left: 23,
      width: 6,
      height: 48,
      type: "low",
    },
    {
      left: 28,
      width: 8,
      height: 116,
      type: "antenna",
    },
    {
      left: 35,
      width: 5,
      height: 70,
      type: "narrow",
    },
    {
      left: 39,
      width: 9,
      height: 91,
      type: "stepped",
    },
    {
      left: 47,
      width: 6,
      height: 58,
      type: "low",
    },
    {
      left: 52,
      width: 8,
      height: 101,
      type: "tower",
    },
    {
      left: 59,
      width: 5,
      height: 76,
      type: "narrow",
    },
    {
      left: 63,
      width: 10,
      height: 64,
      type: "wide",
    },
    {
      left: 72,
      width: 6,
      height: 88,
      type: "stepped",
    },
    {
      left: 77,
      width: 7,
      height: 126,
      type: "antenna",
    },
    {
      left: 83,
      width: 5,
      height: 71,
      type: "narrow",
    },
    {
      left: 87,
      width: 9,
      height: 96,
      type: "tower",
    },
    {
      left: 95,
      width: 6,
      height: 55,
      type: "low",
    },
  ];

  const skyline = buildings
    .map(
      (building, index) => `
        <div
          class="
            skyline-building
            skyline-building--${building.type}
          "
          style="
            --building-left: ${building.left}%;
            --building-width: ${building.width}%;
            --building-height: ${building.height}px;
            --building-delay: ${(index * 0.18).toFixed(2)}s;
          "
        >
          ${
            building.type === "antenna"
              ? `<span class="building-antenna"></span>`
              : ""
          }

          <div class="building-pixels"></div>
        </div>
      `
    )
    .join("");

  return `
    <div class="home-background" aria-hidden="true">
      <div class="home-stars">
        ${smallStars}
        ${crossStars}
      </div>

      <div class="home-skyline">
        ${skyline}
      </div>

      <div class="home-horizon"></div>
      <div class="home-grid"></div>

      <div class="home-vignette"></div>
      <div class="home-grain"></div>
    </div>
  `;
}