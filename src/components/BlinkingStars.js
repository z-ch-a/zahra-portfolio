import "../styles/stars.css";


const stars = [
  { x: 1, y: 20, size: 4, duration: 1.8, delay: 0.1 },
  { x: 2, y: 15, size: 2, duration: 2.8, delay: 0.5 },
  { x: 1, y: 45, size: 5, duration: 1.5, delay: 1.1 },
  { x: 15, y: 15, size: 4, duration: 3.8, delay: 0.2 },
  { x: 24, y: 22, size: 6, duration: 4.6, delay: 1.4 },
  { x: 34, y: 12, size: 2, duration: 5.2, delay: 2.1 },

  { x: 43, y: 27, size: 8, duration: 3.4, delay: 0.8 },
  { x: 52, y: 17, size: 2, duration: 4.2, delay: 2.8 },
  { x: 60, y: 32, size: 5, duration: 5.6, delay: 1.2 },

  { x: 69, y: 16, size: 6, duration: 3.9, delay: 2.3 },
  { x: 76, y: 28, size: 4, duration: 4.8, delay: 0.5 },

  { x: 88, y: 20, size: 5, duration: 5.1, delay: 1.9 },

  { x: 10, y: 37, size: 4, duration: 4.3, delay: 2.6 },
  { x: 31, y: 38, size: 5, duration: 5.5, delay: 0.9 },
  { x: 47, y: 40, size: 6, duration: 4.1, delay: 2.0 },
  { x: 65, y: 39, size: 7, duration: 5.8, delay: 1.1 },
  { x: 84, y: 37, size: 3, duration: 4.7, delay: 2.7 },
  { x: 54, y: 43, size: 5, duration: 4.7, delay: 1.1 },
  { x: 98, y: 33, size: 5, duration: 2.7, delay: 1.1 },
];


export function startBlinkingStars() {
  const homepage = document.querySelector("#homepage");

  if (!homepage) return;

  const existing =
    homepage.querySelector(".animated-stars");

  if (existing) return;


  const starField = document.createElement("div");

  starField.className = "animated-stars";


  stars.forEach((star, index) => {
    const element = document.createElement("span");

    element.className = "animated-star";

    /*
      A few stars get the stronger sparkle animation.
    */
    if ([2, 6, 11].includes(index)) {
      element.classList.add("animated-star--sparkle");
    }

    element.style.setProperty(
      "--star-x",
      `${star.x}%`
    );

    element.style.setProperty(
      "--star-y",
      `${star.y}%`
    );

    element.style.setProperty(
      "--star-size",
      `${star.size}px`
    );

    element.style.setProperty(
      "--star-duration",
      `${star.duration}s`
    );

    element.style.setProperty(
      "--star-delay",
      `${star.delay}s`
    );

    starField.appendChild(element);
  });


  homepage.appendChild(starField);
}