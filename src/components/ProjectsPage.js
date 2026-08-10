import "../styles/projects.css";


/* ==========================================================
   FILTERS
   ========================================================== */

const filters = [
  {
    id: "all",
    label: "ALL",
  },

  {
    id: "architecture",
    label: "ARCHITECTURE",
  },

  {
    id: "urban-regeneration",
    label: "URBAN REGENERATION",
  },

  {
    id: "computational-design",
    label: "COMPUTATIONAL DESIGN",
  },

  {
    id: "digital-fabrication",
    label: "DIGITAL FABRICATION",
  },

  {
    id: "building-technology",
    label: "BUILDING TECHNOLOGY",
  },

  {
    id: "research",
    label: "RESEARCH",
  },
];



/* ==========================================================
   PROJECTS

   Categories are temporary for now.
   We can refine them project by project later.
   ========================================================== */

const projects = [
  {
    title: "La volta che danza!",

    subtitle:
      "Reinventing the Mediterranean shadow through digital fabrication",

    year: "2026",

    categories: [
      "computational-design",
      "digital-fabrication",
    ],

    image: "",

    pages: [],
  },


  {
    title: "The Vena",

    subtitle:
      "Beyond printed objects toward architectural systems",

    year: "2026",

    categories: [
      "computational-design",
      "digital-fabrication",
      "research",
    ],

    image: "",

    pages: [],
  },

    {
    title: "CatEscape",

    subtitle:
      "xx",

    year: "2024",

    categories: [
      "computational-design",
      "digital-fabrication",
    ],

    image: "",

    pages: [],
  },


  {
    title: "NEXXUS",

    subtitle:
      "Advanced Design & Fabrication of a Free-form Shading System",

    year: "2024",

    categories: [
      "computational-design",
      "digital-fabrication",
      "building-technology",
    ],

    image: "",

    pages: [],
  },

  {
    title: "ISF",

    subtitle:
      "Research on Incremental sheet forming",

    year: "2024",

    categories: [
      "computational-design",
      "digital-fabrication",
      "research",
    ],

    image: "",

    pages: [],
  },

   {
    title: "Solymorph",

    subtitle:
      "xx",

    year: "2023",

    categories: [
      "computational-design",
      "digital-fabrication",
      "building-technology",
    ],

    image: "",

    pages: [],
  }, 

  {
    title: "FlexCo",

    subtitle:
      "Mixed-use commercial and coworking hub",

    year: "2022",

    categories: [
      "architecture",
      "building-technology",
      "computational-design",
    ],

    image:
      "/projects/Flexco/FlexcoCover.png",

    pages: [
      "/projects/Flexco/Flexco.jpg",
      "/projects/Flexco/Flexco2.jpg",
      "/projects/Flexco/Flexco3.jpg",
      "/projects/Flexco/Flexco4.jpg",
      "/projects/Flexco/Flexco5.jpg",
      "/projects/Flexco/Flexco6.jpg",
      "/projects/Flexco/Flexco7.jpg",
    
    ],
  },


  {
    title: "Healing the Cut",

    subtitle:
      "xx",

    year: "2022",

    categories: [
      "architecture",
      "building-technology",
      "urban-regeneration",
    ],

    image: "",

    pages: [],
  },


  {
    title: "no Do Bovisa",

    subtitle:
      "xx",

    year: "2021",

    categories: [
      "architecture",
      "building-technology",
      "urban-regeneration",
    ],

    image: "",

    pages: [],
  },


  {
    title: "Scena & Spazio",

    subtitle:
      "xx",

    year: "2021",

    categories: [
      "architecture",
    ],

    image: "",

    pages: [],
  },


  {
    title: "A Complex",

    subtitle:
      "xxx",

    year: "2021",

    categories: [
      "architecture",
    ],

    image: "",

    pages: [],
  },


  {
    title: "A Hospital",

    subtitle:
      "xxx",

    year: "2020",

    categories: [
      "architecture",
    ],

    image: "",

    pages: [],
  },


  {
    title: "Il Capriccio",

    subtitle:
      "xx",

    year: "2020",

    categories: [
      "architecture",
    ],

    image: "",

    pages: [],
  },


  {
    title: "The Shardiccolo",

    subtitle:
      "xx",

    year: "2020",

    categories: [
      "architecture",
      "building-technology",
    ],

    image: "",

    pages: [],
  },


  {
    title: "A School",

    subtitle:
      "xx",

    year: "2019",

    categories: [
      "architecture",
    ],

    image: "",

    pages: [],
  },


  {
    title: "A Villa",

    subtitle:
      "Short description of the project",

    year: "2019",

    categories: [
      "architecture",
    ],

    image: "",

    pages: [],
  },


];



/* ==========================================================
   CREATE PROJECTS PAGE
   ========================================================== */

export function createProjectsPage() {

  const filterButtons =
    filters
      .map(
        (filter) => `
          <button
            class="
              projects-filter
              ${
                filter.id === "all"
                  ? "projects-filter--active"
                  : ""
              }
            "
            type="button"
            data-project-filter="${filter.id}"
            aria-pressed="${
              filter.id === "all"
                ? "true"
                : "false"
            }"
          >
            ${filter.label}
          </button>
        `
      )
      .join("");


  const cards =
    projects
      .map(
        (project, index) => {

          const imageStyle =
            project.image
              ? `style="background-image: url('${project.image}')"`
              : "";


          return `
            <article
              class="project-card"
              data-project-index="${index}"
              aria-hidden="true"
              role="button"
              tabindex="-1"
            >

              <div
                class="project-image"
                ${imageStyle}
              >

                ${
                  project.image
                    ? ""
                    : `
                      <span class="project-placeholder">
                        IMAGE ${String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>
                    `
                }

              </div>


              <div class="project-information">

                <h2>
                  ${project.title}
                </h2>

                <p>
                  ${project.subtitle}
                </p>

                <span>
                  ${project.year}
                </span>

              </div>

            </article>
          `;
        }
      )
      .join("");


  return `
    <section
      class="projects-page"
      id="projects-page"
      hidden
    >

      <div class="projects-stars"></div>


      <!-- ================================================
           BACK
           ================================================ -->

      <button
        class="projects-back-button"
        id="projects-back-button"
        type="button"
        aria-label="Return to homepage"
      >

        <span class="back-arrow">
          &lt;
        </span>

        <span>
          BACK
        </span>

      </button>



      <!-- ================================================
           FILTERS
           ================================================ -->

      <nav
        class="projects-filters"
        id="projects-filters"
        aria-label="Filter projects"
      >

        ${filterButtons}

      </nav>



      <!-- ================================================
           CAROUSEL
           ================================================ -->

      <div class="projects-slider">

        <div
          class="projects-track"
          id="projects-track"
        >

          ${cards}

        </div>

      </div>



      <!-- ================================================
           CONTROLS
           ================================================ -->

      <div class="projects-controls">

        <button
          class="
            project-arrow
            project-arrow--previous
          "
          id="project-previous"
          type="button"
          aria-label="Previous project"
        >

          <span>
            &lt;
          </span>

        </button>


        <button
          class="
            project-arrow
            project-arrow--next
          "
          id="project-next"
          type="button"
          aria-label="Next project"
        >

          <span>
            &gt;
          </span>

        </button>

      </div>

    </section>
  `;
}



/* ==========================================================
   START PROJECTS PAGE
   ========================================================== */

export function startProjectsPage() {

  const cards =
    Array.from(
      document.querySelectorAll(
        ".project-card"
      )
    );


  const filterButtons =
    Array.from(
      document.querySelectorAll(
        ".projects-filter"
      )
    );


  const previousButton =
    document.querySelector(
      "#project-previous"
    );


  const nextButton =
    document.querySelector(
      "#project-next"
    );


  const backButton =
    document.querySelector(
      "#projects-back-button"
    );


  if (
    !cards.length ||
    !filterButtons.length ||
    !previousButton ||
    !nextButton ||
    !backButton
  ) {
    return;
  }



  /* ========================================================
     STATE
     ======================================================== */

  let activeProjectIndex = 0;

  let visibleProjectIndices =
    projects.map(
      (_, index) => index
    );


  /*
    Empty Set means ALL.
  */

  const selectedFilters =
    new Set();


  let isAnimating = false;



  /* ========================================================
     FILTER MATCH
     ======================================================== */

  function projectMatchesFilters(
    project
  ) {

    /*
      Nothing selected means ALL.
    */

    if (
      selectedFilters.size === 0
    ) {
      return true;
    }


    /*
      OR logic:

      A project only needs to match
      one selected category.
    */

    return project.categories.some(
      (category) =>
        selectedFilters.has(
          category
        )
    );
  }



  /* ========================================================
     BUILD VISIBLE PROJECT LIST
     ======================================================== */

  function calculateVisibleProjects() {

    visibleProjectIndices =
      projects
        .map(
          (project, index) => ({
            project,
            index,
          })
        )
        .filter(
          ({ project }) =>
            projectMatchesFilters(
              project
            )
        )
        .map(
          ({ index }) =>
            index
        );


    /*
      Safety fallback.
    */

    if (
      visibleProjectIndices.length === 0
    ) {

      visibleProjectIndices =
        projects.map(
          (_, index) =>
            index
        );


      selectedFilters.clear();

    }



    /*
      If current project disappears
      because of filtering, move to
      first available project.
    */

    if (
      !visibleProjectIndices.includes(
        activeProjectIndex
      )
    ) {

      activeProjectIndex =
        visibleProjectIndices[0];

    }

  }



  /* ========================================================
     FILTER BUTTON VISUAL STATE
     ======================================================== */

  function updateFilterButtons() {

    filterButtons.forEach(
      (button) => {

        const filter =
          button.dataset.projectFilter;


        let isActive = false;


        if (
          filter === "all"
        ) {

          isActive =
            selectedFilters.size === 0;

        } else {

          isActive =
            selectedFilters.has(
              filter
            );

        }


        button.classList.toggle(
          "projects-filter--active",
          isActive
        );


        button.setAttribute(
          "aria-pressed",
          isActive
            ? "true"
            : "false"
        );

      }
    );

  }



  /* ========================================================
     RELATIVE POSITION
     ======================================================== */

  function getRelativePosition(
    projectIndex
  ) {

    const cardPosition =
      visibleProjectIndices.indexOf(
        projectIndex
      );


    const activePosition =
      visibleProjectIndices.indexOf(
        activeProjectIndex
      );


    if (
      cardPosition === -1 ||
      activePosition === -1
    ) {
      return null;
    }


    let difference =
      cardPosition -
      activePosition;


    const total =
      visibleProjectIndices.length;


    if (
      difference >
      total / 2
    ) {

      difference -=
        total;

    }


    if (
      difference <
      -total / 2
    ) {

      difference +=
        total;

    }


    return difference;
  }



  /* ========================================================
     UPDATE CARDS
     ======================================================== */

  function updateCards() {

    cards.forEach(
      (card, projectIndex) => {

        const isVisible =
          visibleProjectIndices.includes(
            projectIndex
          );


        /*
          FILTERED OUT
        */

        if (!isVisible) {

          card.classList.add(
            "project-card--filtered-out"
          );


          card.classList.remove(
            "project-card--active"
          );


          card.classList.remove(
            "project-card--hidden"
          );


          card.setAttribute(
            "aria-hidden",
            "true"
          );


          card.tabIndex =
            -1;


          return;
        }



        card.classList.remove(
          "project-card--filtered-out"
        );


        const position =
          getRelativePosition(
            projectIndex
          );


        const distance =
          Math.abs(position);


        const isActive =
          projectIndex ===
          activeProjectIndex;



        card.classList.toggle(
          "project-card--active",
          isActive
        );


        card.setAttribute(
          "aria-hidden",
          isActive
            ? "false"
            : "true"
        );


        card.tabIndex =
          isActive
            ? 0
            : -1;


        card.style.setProperty(
          "--card-position",
          position
        );


        card.style.setProperty(
          "--card-distance",
          distance
        );


        if (
          distance > 3
        ) {

          card.classList.add(
            "project-card--hidden"
          );

        } else {

          card.classList.remove(
            "project-card--hidden"
          );

        }

      }
    );

  }



  /* ========================================================
     APPLY FILTERS
     ======================================================== */

  function applyFilters() {

    calculateVisibleProjects();

    updateFilterButtons();

    updateCards();

  }



  /* ========================================================
     FILTER CLICK
     ======================================================== */

  filterButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const filter =
            button.dataset.projectFilter;


          /*
            ALL resets everything.
          */

          if (
            filter === "all"
          ) {

            selectedFilters.clear();

            applyFilters();

            return;

          }



          /*
            Toggle category.
          */

          if (
            selectedFilters.has(
              filter
            )
          ) {

            selectedFilters.delete(
              filter
            );

          } else {

            selectedFilters.add(
              filter
            );

          }



          /*
            If last selected filter was
            removed, ALL automatically
            becomes active.
          */

          applyFilters();

        }
      );

    }
  );



  /* ========================================================
     MOVE SLIDER
     ======================================================== */

  function moveSlider(
    direction
  ) {

    if (
      isAnimating ||
      visibleProjectIndices.length <= 1
    ) {
      return;
    }


    isAnimating =
      true;


    const currentPosition =
      visibleProjectIndices.indexOf(
        activeProjectIndex
      );


    const nextPosition =
      (
        currentPosition +
        direction +
        visibleProjectIndices.length
      ) %
      visibleProjectIndices.length;


    activeProjectIndex =
      visibleProjectIndices[
        nextPosition
      ];


    updateCards();


    window.setTimeout(
      () => {

        isAnimating =
          false;

      },
      550
    );

  }



  /* ========================================================
     OPEN PROJECT
     ======================================================== */

  function openProject(
    projectIndex
  ) {

    const card =
      cards[
        projectIndex
      ];


    if (!card) {
      return;
    }


    if (
      !card.classList.contains(
        "project-card--active"
      )
    ) {
      return;
    }


    const project =
      projects[
        projectIndex
      ];


    if (!project) {
      return;
    }


    window.dispatchEvent(
      new CustomEvent(
        "portfolio:open-project",
        {
          detail:
            project,
        }
      )
    );

  }



  /* ========================================================
     PROJECT CARD EVENTS
     ======================================================== */

  cards.forEach(
    (card, projectIndex) => {

      card.addEventListener(
        "click",
        () => {

          openProject(
            projectIndex
          );

        }
      );


      card.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();


            openProject(
              projectIndex
            );

          }

        }
      );

    }
  );



  /* ========================================================
     PREVIOUS
     ======================================================== */

  previousButton.addEventListener(
    "click",
    () => {

      moveSlider(-1);

    }
  );



  /* ========================================================
     NEXT
     ======================================================== */

  nextButton.addEventListener(
    "click",
    () => {

      moveSlider(1);

    }
  );



  /* ========================================================
     BACK
     ======================================================== */

  backButton.addEventListener(
    "click",
    () => {

      const homepage =
        document.querySelector(
          "#homepage"
        );


      const projectsPage =
        document.querySelector(
          "#projects-page"
        );


      if (
        !homepage ||
        !projectsPage
      ) {
        return;
      }


      projectsPage.hidden =
        true;


      homepage.style.display =
        "";

    }
  );



  /* ========================================================
     KEYBOARD NAVIGATION
     ======================================================== */

  window.addEventListener(
    "keydown",
    (event) => {

      const projectsPage =
        document.querySelector(
          "#projects-page"
        );


      if (
        !projectsPage ||
        projectsPage.hidden
      ) {
        return;
      }



      /*
        Do not move carousel while
        portfolio window is open.
      */

      const projectWindow =
        document.querySelector(
          "#project-window-overlay"
        );


      if (
        projectWindow &&
        !projectWindow.hidden
      ) {
        return;
      }



      if (
        event.key ===
        "ArrowLeft"
      ) {

        event.preventDefault();

        moveSlider(-1);

      }


      if (
        event.key ===
        "ArrowRight"
      ) {

        event.preventDefault();

        moveSlider(1);

      }

    }
  );



  /* ========================================================
     INITIAL STATE
     ======================================================== */

  calculateVisibleProjects();

  updateFilterButtons();

  updateCards();

}