import "../styles/cursor.css";


export function startHomeCursor() {

  /* ========================================================
     PREVENT DUPLICATE CURSOR
     ======================================================== */

  const existingCursor =
    document.querySelector("#home-cursor");


  if (existingCursor) {
    return;
  }



  /* ========================================================
     CREATE CURSOR
     ======================================================== */

  const cursor =
    document.createElement("div");


  cursor.className =
    "home-cursor";


  cursor.id =
    "home-cursor";


  cursor.innerHTML = `
    <span class="home-cursor-dot"></span>
  `;


  document.body.appendChild(
    cursor
  );



  /* ========================================================
     CHECK WHETHER CUSTOM CURSOR SHOULD BE ACTIVE
     ======================================================== */

  function isInsideCustomCursorArea(target) {

    const introScreen =
      document.querySelector(
        "#intro-screen"
      );


    const homepage =
      document.querySelector(
        "#homepage"
      );


    const projectsPage =
      document.querySelector(
        "#projects-page"
      );


    const pageTransition =
      document.querySelector(
        ".page-transition"
      );


    const projectWindowOverlay =
      document.querySelector(
        "#project-window-overlay"
      );



    /* ------------------------------------------------------
       INTRO
       ------------------------------------------------------ */

    const introIsActive =
      introScreen &&
      !introScreen.classList.contains(
        "intro-screen--hidden"
      );


    const insideIntro =
      introIsActive &&
      introScreen.contains(target);



    /* ------------------------------------------------------
       HOMEPAGE
       ------------------------------------------------------ */

    const homepageIsActive =
      homepage &&
      homepage.style.display !== "none";


    const insideHomepage =
      homepageIsActive &&
      homepage.contains(target);



    /* ------------------------------------------------------
       PROJECTS PAGE
       ------------------------------------------------------ */

    const projectsIsActive =
      projectsPage &&
      !projectsPage.hidden;


    const insideProjects =
      projectsIsActive &&
      projectsPage.contains(target);



    /* ------------------------------------------------------
       PAGE TRANSITION
       ------------------------------------------------------ */

    const insideTransition =
      pageTransition &&
      pageTransition.contains(target);



    /* ------------------------------------------------------
       PROJECT WINDOW
       ------------------------------------------------------ */

    const projectWindowIsActive =
      projectWindowOverlay &&
      !projectWindowOverlay.hidden;


    const insideProjectWindow =
      projectWindowIsActive &&
      projectWindowOverlay.contains(
        target
      );



    return (
      insideIntro ||
      insideHomepage ||
      insideProjects ||
      insideTransition ||
      insideProjectWindow
    );
  }



  /* ========================================================
     FIND CLICKABLE ELEMENT
     ======================================================== */

  function isClickable(target) {

    if (
      !target ||
      typeof target.closest !== "function"
    ) {
      return false;
    }


    const clickable =
      target.closest(`
        button,
        a,
        [role="button"],
        [data-page],
        [data-project-index],
        .clickable,
        .project-card,
        .main-menu-item,
        .project-arrow,
        .projects-back-button,
        .project-window-action,
        .project-window-close
      `);


    return Boolean(clickable);
  }



  /* ========================================================
     UPDATE CURSOR
     ======================================================== */

  function updateCursor(event) {

    const insideArea =
      isInsideCustomCursorArea(
        event.target
      );


    if (!insideArea) {

      cursor.classList.remove(
        "is-visible"
      );


      cursor.classList.remove(
        "is-hovering"
      );


      cursor.classList.remove(
        "is-clicking"
      );


      return;
    }



    /* ------------------------------------------------------
       POSITION
       ------------------------------------------------------ */

    cursor.style.left =
      `${event.clientX}px`;


    cursor.style.top =
      `${event.clientY}px`;



    /* ------------------------------------------------------
       SHOW
       ------------------------------------------------------ */

    cursor.classList.add(
      "is-visible"
    );



    /* ------------------------------------------------------
       HOVER STATE
       ------------------------------------------------------ */

    cursor.classList.toggle(
      "is-hovering",
      isClickable(event.target)
    );
  }



  /* ========================================================
     MOUSE MOVE
     ======================================================== */

  window.addEventListener(
    "mousemove",
    updateCursor
  );



  /* ========================================================
     MOUSE DOWN
     ======================================================== */

  window.addEventListener(
    "mousedown",
    (event) => {

      if (
        !isInsideCustomCursorArea(
          event.target
        )
      ) {
        return;
      }


      cursor.classList.add(
        "is-clicking"
      );

    }
  );



  /* ========================================================
     MOUSE UP
     ======================================================== */

  window.addEventListener(
    "mouseup",
    () => {

      cursor.classList.remove(
        "is-clicking"
      );

    }
  );



  /* ========================================================
     MOUSE LEAVES DOCUMENT
     ======================================================== */

  document.addEventListener(
    "mouseleave",
    () => {

      cursor.classList.remove(
        "is-visible"
      );


      cursor.classList.remove(
        "is-hovering"
      );


      cursor.classList.remove(
        "is-clicking"
      );

    }
  );



  /* ========================================================
     WINDOW LOSES FOCUS
     ======================================================== */

  window.addEventListener(
    "blur",
    () => {

      cursor.classList.remove(
        "is-visible"
      );


      cursor.classList.remove(
        "is-hovering"
      );


      cursor.classList.remove(
        "is-clicking"
      );

    }
  );

}