export function createBackground() {
  const stars = Array.from({ length: 34 }, (_, index) => {
    const left = 3 + ((index * 37) % 94);
    const top = 5 + ((index * 53) % 65);
    const size = index % 9 === 0 ? 2 : 1;
    const delay = ((index * 0.31) % 4).toFixed(2);
    const duration = (3 + ((index * 0.27) % 3)).toFixed(2);

    return `
      <span
        class="home-star"
        style="
          --star-left: ${left}%;
          --star-top: ${top}%;
          --star-size: ${size}px;
          --star-delay: ${delay}s;
          --star-duration: ${duration}s;
        "
      ></span>
    `;
  }).join("");

  return `
    <div class="home-background" aria-hidden="true">
      <div class="home-stars">
        ${stars}
      </div>

      <div class="home-horizon"></div>
      <div class="home-grid"></div>

      <div class="home-vignette"></div>
      <div class="home-scanlines"></div>
    </div>
  `;
}