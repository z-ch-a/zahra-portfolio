import "../styles/projects.css";

const projects = [
  {
    title: "The Vena",
    subtitle: "Beyond printed objects toward architectural systems",
    year: "2026",
    image: "",
  },
  {
    title: "NEXXUS",
    subtitle: "Advanced Design & Fabrication of a Free-form Shading System",
    year: "2024",
    image: "",
  },
   {
    title: "FlexCo",
    subtitle: "Mixed-use commercial and coworking hub",
    year: "2022",
    image: "",
  },
  {
    title: "ISF",
    subtitle: "Research on Incremental sheet froming",
    year: "2024",
    image: "",
  },
  {
    title: "CatEscape",
    subtitle: "Material-Adaptive Design System",
    year: "2024",
    image: "",
  },
  {
    title: "Project Five",
    subtitle: "Short description of the project",
    year: "2025",
    image: "",
  },
  {
    title: "Project Six",
    subtitle: "Short description of the project",
    year: "2024",
    image: "",
  },
  {
    title: "Project Seven",
    subtitle: "Short description of the project",
    year: "2024",
    image: "",
  },
  {
    title: "Project Eight",
    subtitle: "Short description of the project",
    year: "2024",
    image: "",
  },
  {
    title: "Project Nine",
    subtitle: "Short description of the project",
    year: "2023",
    image: "",
  },
  {
    title: "Project Ten",
    subtitle: "Short description of the project",
    year: "2023",
    image: "",
  },
  {
    title: "Project Eleven",
    subtitle: "Short description of the project",
    year: "2023",
    image: "",
  },
  {
    title: "Project Twelve",
    subtitle: "Short description of the project",
    year: "2022",
    image: "",
  },
  {
    title: "Project Thirteen",
    subtitle: "Short description of the project",
    year: "2022",
    image: "",
  },
  {
    title: "Project Fourteen",
    subtitle: "Short description of the project",
    year: "2022",
    image: "",
  },
];

export function createProjectsPage() {
  const cards = projects
    .map((project, index) => {
      const imageStyle = project.image
        ? `style="background-image: url('${project.image}')"`
        : "";

      return `
        <article
          class="project-card"
          data-project-index="${index}"
          aria-hidden="true"
        >
          <div class="project-image" ${imageStyle}>
            ${
              project.image
                ? ""
                : `<span class="project-placeholder">IMAGE ${String(
                    index + 1
                  ).padStart(2, "0")}</span>`
            }
          </div>

          <div class="project-information">
            <h2>${project.title}</h2>
            <p>${project.subtitle}</p>
            <span>${project.year}</span>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <section class="projects-page" id="projects-page" hidden>
      <div class="projects-stars" aria-hidden="true"></div>

      <button
        class="projects-back-button"
        id="projects-back-button"
        type="button"
        aria-label="Return to homepage"
      >
        &lt;&lt;
      </button>

      <div class="projects-slider">
        <div class="projects-track" id="projects-track">
          ${cards}
        </div>
      </div>

      <div class="projects-controls">
        <button
          class="project-arrow"
          id="project-previous"
          type="button"
          aria-label="Previous project"
        >
          &lt;&lt;
        </button>

        <button
          class="project-arrow"
          id="project-next"
          type="button"
          aria-label="Next project"
        >
          &gt;&gt;
        </button>
      </div>
    </section>
  `;
}

export function startProjectsPage() {
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const previousButton = document.querySelector("#project-previous");
  const nextButton = document.querySelector("#project-next");
  const backButton = document.querySelector("#projects-back-button");

  if (!cards.length || !previousButton || !nextButton) return;

  let activeIndex = 0;
  let isAnimating = false;

  function getRelativePosition(cardIndex) {
    let difference = cardIndex - activeIndex;
    const total = cards.length;

    if (difference > total / 2) {
      difference -= total;
    }

    if (difference < -total / 2) {
      difference += total;
    }

    return difference;
  }

  function updateCards() {
    cards.forEach((card, index) => {
      const position = getRelativePosition(index);
      const distance = Math.abs(position);

      card.classList.toggle("project-card--active", position === 0);
      card.setAttribute(
        "aria-hidden",
        position === 0 ? "false" : "true"
      );

      card.style.setProperty("--card-position", position);
      card.style.setProperty("--card-distance", distance);

      if (distance > 3) {
        card.classList.add("project-card--hidden");
      } else {
        card.classList.remove("project-card--hidden");
      }
    });
  }

  function moveSlider(direction) {
    if (isAnimating) return;

    isAnimating = true;

    activeIndex =
      (activeIndex + direction + cards.length) % cards.length;
    backButton.addEventListener("click", () => {
  const homepage = document.querySelector("#homepage");
  const projectsPage = document.querySelector("#projects-page");

  if (!homepage || !projectsPage) return;

  projectsPage.hidden = true;
  homepage.style.display = "";
});
    updateCards();

    window.setTimeout(() => {
      isAnimating = false;
    }, 550);
  }

  previousButton.addEventListener("click", () => {
    moveSlider(-1);
  });

  nextButton.addEventListener("click", () => {
    moveSlider(1);
  });

  window.addEventListener("keydown", (event) => {
    const projectsPage = document.querySelector("#projects-page");

    if (!projectsPage || projectsPage.hidden) return;

    if (event.key === "ArrowLeft") {
      moveSlider(-1);
    }

    if (event.key === "ArrowRight") {
      moveSlider(1);
    }
  });

  updateCards();
}