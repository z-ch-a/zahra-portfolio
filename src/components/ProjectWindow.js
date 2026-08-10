import "../styles/project-window.css";


/* ==========================================================
   CREATE PROJECT WINDOW
   ========================================================== */

export function createProjectWindow() {

  return `
    <div
      class="project-window-overlay"
      id="project-window-overlay"
      hidden
    >

      <div
        class="project-window"
        id="project-window"
      >


        <!-- ================================================
             TITLE BAR
             ================================================ -->

        <header class="project-window-header">

          <div class="project-window-title">

            <span
              class="project-window-title-dot"
            ></span>


            <span id="project-window-title">
              PROJECT
            </span>

          </div>


          <div class="project-window-actions">

            <button
              class="project-window-action"
              id="project-window-maximize"
              type="button"
              aria-label="Maximize project window"
              title="Maximize"
            >
              □
            </button>


            <button
              class="
                project-window-action
                project-window-close
              "
              id="project-window-close"
              type="button"
              aria-label="Close project"
              title="Close"
            >
              ×
            </button>

          </div>

        </header>



        <!-- ================================================
             PORTFOLIO CONTENT
             ================================================ -->

        <div
          class="project-window-content"
          id="project-window-content"
        >

          <div
            class="project-document"
            id="project-document"
          ></div>

        </div>



        <!-- ================================================
             STATUS BAR
             ================================================ -->

        <footer class="project-window-footer">

          <span id="project-window-page">
            00 / 00
          </span>


          <span id="project-window-meta">
            PROJECT
          </span>

        </footer>

      </div>

    </div>
  `;
}



/* ==========================================================
   START PROJECT WINDOW
   ========================================================== */

export function startProjectWindow() {

  const overlay =
    document.querySelector(
      "#project-window-overlay"
    );


  const windowElement =
    document.querySelector(
      "#project-window"
    );


  const content =
    document.querySelector(
      "#project-window-content"
    );


  const projectDocument =
    document.querySelector(
      "#project-document"
    );


  const closeButton =
    document.querySelector(
      "#project-window-close"
    );


  const maximizeButton =
    document.querySelector(
      "#project-window-maximize"
    );


  const title =
    document.querySelector(
      "#project-window-title"
    );


  const meta =
    document.querySelector(
      "#project-window-meta"
    );


  const pageCounter =
    document.querySelector(
      "#project-window-page"
    );


  if (
    !overlay ||
    !windowElement ||
    !content ||
    !projectDocument ||
    !closeButton ||
    !maximizeButton
  ) {
    return;
  }


  let isMaximized = false;



  /* ========================================================
     RENDER PORTFOLIO PAGES
     ======================================================== */

  function renderProjectPages(
    project
  ) {

    const pages =
      Array.isArray(project.pages)
        ? project.pages
        : [];


    /*
      Project does not have
      portfolio pages yet.
    */

    if (!pages.length) {

      projectDocument.innerHTML = `
        <div class="project-document-empty">

          <span>
            PROJECT CONTENT COMING SOON
          </span>

        </div>
      `;


      if (pageCounter) {

        pageCounter.textContent =
          "00 / 00";

      }


      return;
    }



    /*
      Build portfolio pages.
    */

    projectDocument.innerHTML =
      pages
        .map(
          (page, index) => {

            const loading =
              index === 0
                ? "eager"
                : "lazy";


            return `
              <div
                class="project-document-page"
                data-page-number="${index + 1}"
              >

                <img
                  class="project-document-image"
                  src="${page}"
                  alt="${project.title} portfolio page ${index + 1}"
                  loading="${loading}"
                  decoding="async"
                  draggable="false"
                >

              </div>
            `;
          }
        )
        .join("");


    if (pageCounter) {

      pageCounter.textContent =
        `01 / ${String(
          pages.length
        ).padStart(2, "0")}`;

    }

  }



  /* ========================================================
     PAGE COUNTER
     ======================================================== */

  function updateVisiblePage() {

    const pages =
      Array.from(
        projectDocument.querySelectorAll(
          ".project-document-page"
        )
      );


    if (
      !pages.length ||
      !pageCounter
    ) {
      return;
    }


    const contentRect =
      content.getBoundingClientRect();


    /*
      We calculate which portfolio
      page is closest to the middle
      of the viewer.
    */

    const viewportCenter =
      contentRect.top +
      contentRect.height / 2;


    let closestPage = 0;

    let closestDistance =
      Infinity;


    pages.forEach(
      (page, index) => {

        const rect =
          page.getBoundingClientRect();


        const pageCenter =
          rect.top +
          rect.height / 2;


        const distance =
          Math.abs(
            viewportCenter -
            pageCenter
          );


        if (
          distance <
          closestDistance
        ) {

          closestDistance =
            distance;


          closestPage =
            index;

        }

      }
    );


    pageCounter.textContent =
      `${String(
        closestPage + 1
      ).padStart(2, "0")} / ${String(
        pages.length
      ).padStart(2, "0")}`;

  }



  /* ========================================================
     SCROLL LISTENER
     ======================================================== */

  content.addEventListener(
    "scroll",
    updateVisiblePage,
    {
      passive: true,
    }
  );



  /* ========================================================
     OPEN PROJECT
     ======================================================== */

  window.addEventListener(
    "portfolio:open-project",
    (event) => {

      const project =
        event.detail;


      if (!project) {
        return;
      }



      /* -----------------------------------------------
         PROJECT TITLE
         ----------------------------------------------- */

      if (title) {

        title.textContent =
          project.title;

      }


      if (meta) {

        meta.textContent =
          `${project.title.toUpperCase()} / ${project.year}`;

      }



      /* -----------------------------------------------
         BUILD PORTFOLIO
         ----------------------------------------------- */

      renderProjectPages(
        project
      );



      /* -----------------------------------------------
         RESET MAXIMIZE
         ----------------------------------------------- */

      isMaximized =
        false;


      windowElement.classList.remove(
        "project-window--maximized"
      );


      overlay.classList.remove(
        "project-window-overlay--maximized"
      );


      maximizeButton.textContent =
        "□";


      maximizeButton.setAttribute(
        "aria-label",
        "Maximize project window"
      );


      maximizeButton.setAttribute(
        "title",
        "Maximize"
      );



      /* -----------------------------------------------
         RESET SCROLL
         ----------------------------------------------- */

      content.scrollTop =
        0;



      /* -----------------------------------------------
         SHOW WINDOW
         ----------------------------------------------- */

      overlay.hidden =
        false;


      requestAnimationFrame(
        () => {

          overlay.classList.add(
            "project-window-overlay--visible"
          );


          windowElement.classList.add(
            "project-window--visible"
          );


          updateVisiblePage();

        }
      );

    }
  );



  /* ========================================================
     MAXIMIZE / RESTORE
     ======================================================== */

  function toggleMaximize() {

    isMaximized =
      !isMaximized;


    windowElement.classList.toggle(
      "project-window--maximized",
      isMaximized
    );


    overlay.classList.toggle(
      "project-window-overlay--maximized",
      isMaximized
    );


    maximizeButton.textContent =
      isMaximized
        ? "❐"
        : "□";


    maximizeButton.setAttribute(
      "aria-label",
      isMaximized
        ? "Restore project window"
        : "Maximize project window"
    );


    maximizeButton.setAttribute(
      "title",
      isMaximized
        ? "Restore"
        : "Maximize"
    );


    /*
      Recalculate visible page after
      the window changes size.
    */

    window.setTimeout(
      updateVisiblePage,
      280
    );

  }



  maximizeButton.addEventListener(
    "click",
    toggleMaximize
  );



  /* ========================================================
     CLOSE
     ======================================================== */

  function closeWindow() {

    overlay.classList.remove(
      "project-window-overlay--visible"
    );


    windowElement.classList.remove(
      "project-window--visible"
    );


    window.setTimeout(
      () => {

        overlay.hidden =
          true;


        content.scrollTop =
          0;


        isMaximized =
          false;


        windowElement.classList.remove(
          "project-window--maximized"
        );


        overlay.classList.remove(
          "project-window-overlay--maximized"
        );


        maximizeButton.textContent =
          "□";

      },
      240
    );

  }



  closeButton.addEventListener(
    "click",
    closeWindow
  );



  /* ========================================================
     KEYBOARD
     ======================================================== */

  window.addEventListener(
    "keydown",
    (event) => {

      if (
        overlay.hidden
      ) {
        return;
      }


      if (
        event.key ===
        "Escape"
      ) {

        closeWindow();

      }

    }
  );

}