import "../styles/project-window.css";


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

        <!-- ===============================
             TITLE BAR
             =============================== -->

        <header class="project-window-header">

          <div class="project-window-title">

            <span class="project-window-title-dot"></span>

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



        <!-- ===============================
             SCROLLABLE CONTENT
             =============================== -->

        <div
          class="project-window-content"
          id="project-window-content"
        >

          <div class="project-document">


            <!-- PAGE 01 -->

            <div class="project-document-page">

              <div class="project-demo-content">

                <div>

                  <h1 id="project-document-title">
                    The Vena
                  </h1>

                  <p id="project-document-subtitle">
                    Beyond printed objects toward
                    architectural systems
                  </p>

                </div>


                <div class="project-demo-image">
                  PROJECT PAGE 01
                </div>

              </div>

            </div>



            <!-- PAGE 02 -->

            <div class="project-document-page">

              <span>
                PROJECT PAGE 02
              </span>

            </div>



            <!-- PAGE 03 -->

            <div class="project-document-page">

              <span>
                PROJECT PAGE 03
              </span>

            </div>


          </div>

        </div>



        <!-- ===============================
             STATUS BAR
             =============================== -->

        <footer class="project-window-footer">

          <span id="project-window-page">
            01 / 03
          </span>


          <span id="project-window-meta">
            THE VENA / 2026
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


  const documentTitle =
    document.querySelector(
      "#project-document-title"
    );


  const documentSubtitle =
    document.querySelector(
      "#project-document-subtitle"
    );


  const meta =
    document.querySelector(
      "#project-window-meta"
    );


  if (
    !overlay ||
    !windowElement ||
    !closeButton ||
    !maximizeButton
  ) {
    return;
  }



  let isMaximized = false;



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


      /* PROJECT INFORMATION */

      if (title) {
        title.textContent =
          project.title;
      }


      if (documentTitle) {
        documentTitle.textContent =
          project.title;
      }


      if (documentSubtitle) {
        documentSubtitle.textContent =
          project.subtitle;
      }


      if (meta) {
        meta.textContent =
          `${project.title.toUpperCase()} / ${project.year}`;
      }



      /* RESET MAXIMIZED STATE */

      isMaximized = false;


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



      /* RESET SCROLL */

      if (content) {
        content.scrollTop = 0;
      }



      /* SHOW */

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



    /* CHANGE ICON */

    maximizeButton.textContent =
      isMaximized
        ? "❐"
        : "□";



    /* ACCESSIBILITY */

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


        /* reset maximize after closing */

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

      if (overlay.hidden) {
        return;
      }


      /* ESC CLOSES PROJECT */

      if (
        event.key ===
        "Escape"
      ) {

        closeWindow();

      }

    }
  );

}