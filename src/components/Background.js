function generateStars(count) {
  let starsHTML = "";

  for (let i = 0; i < count; i++) {
    const top = Math.random() * 55;
    const left = Math.random() * 100;
    const size = Math.random() * 3 + 2;
    const delay = Math.random() * 4;
    const duration = Math.random() * 3 + 2;

    starsHTML += `
      <div class="star" style="
        top: ${top}%;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
      "></div>
    `;
  }

  return starsHTML;
}

function generateSkyline(count) {
  let buildingsHTML = "";
  const types = ["flat", "flat", "flat", "pointed", "antenna"];

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];

    const tierRoll = Math.random();
    let baseHeight;

    if (tierRoll > 0.88) {
      baseHeight = Math.random() * 16 + 34; // dramatic tower: 34-50vh
    } else if (tierRoll > 0.6) {
      baseHeight = Math.random() * 12 + 22; // medium-tall: 22-34vh
    } else {
      baseHeight = Math.random() * 10 + 8; // short: 8-18vh
    }

    let width, height;

    if (type === "antenna") {
      width = Math.random() * 1.4 + 1.5;
      height = baseHeight + 5;
    } else if (type === "pointed") {
      width = Math.random() * 2.2 + 2.2;
      height = baseHeight;
    } else {
      width = Math.random() * 3.5 + 2;
      height = baseHeight;
    }

    const offsetX = Math.random() * 40;
    const offsetY = Math.random() * 40;

    const antennaHTML =
      type === "antenna" ? `<div class="antenna-spike"></div>` : "";

    buildingsHTML += `
      <div class="building building--${type}" style="
        width: ${width}vw;
        height: ${height}vh;
        background-position: ${offsetX}px ${offsetY}px;
      ">${antennaHTML}</div>
    `;
  }

  return buildingsHTML;
}

export function createBackground() {
  return `
    <div class="stars">
      ${generateStars(40)}
    </div>

    <div class="skyline">
      ${generateSkyline(50)}
    </div>

    <div class="horizon"></div>
    <div class="grid"></div>
  `;
}