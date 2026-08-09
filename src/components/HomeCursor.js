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


  document.body.appendChild(cursor);



  /* ========================================================
     CHECK WHERE CUSTOM CURSOR IS ALLOWED
     ======================================================== */

  function isInsideCustomCursorArea(target) {

    const introScreen =
      document.querySelector("#intro-screen");

    const homepage =
      document.querySelector("#homepage");

    const projectsPage =
      document.querySelector("#projects-page");

    const pageTransition =
      document.querySelector(".page-transition");


    /* INTRO SCREEN */

    const introIsActive =
      introScreen &&
      !introScreen.classList.contains(
        "intro-screen--hidden"
      );


    const insideIntro =
      introIsActive &&
      introScreen.contains(target);


    /* HOMEPAGE */

    const homepageIsActive =
      homepage &&
      homepage.style.display !== "none";


    const insideHomepage =
      homepageIsActive &&
      homepage.contains(target);


    /* PROJECTS PAGE */

    const projectsIsActive =
      projectsPage &&
      !projectsPage.hidden;


    const insideProjects =
      projectsIsActive &&
      projectsPage.contains(target);


    /* TRANSITION PAGE */

    const insideTransition =
      pageTransition &&
      pageTransition.contains(target);


    return (
      insideIntro ||
      insideHomepage ||
      insideProjects ||
      insideTransition
    );
  }



  /* ========================================================
     UPDATE CURSOR
     ======================================================== */

  function updateCursor(event) {

    if (
      !isInsideCustomCursorArea(
        event.target
      )
    ) {

      cursor.classList.remove(
        "is-visible"
      );

      cursor.classList.remove(
        "is-hovering"
      );

      return;
    }


    /* SHOW */

    cursor.classList.add(
      "is-visible"
    );


    /* POSITION */

    cursor.style.left =
      `${event.clientX}px`;

    cursor.style.top =
      `${event.clientY}px`;


    /* ======================================================
       CLICKABLE ELEMENT DETECTION
       ====================================================== */

    const clickable =
      event.target.closest(`
        button,
        a,
        [role="button"],
        .clickable,
        .project-card,
        [data-project-index],
        [data-page]
      `);


    cursor.classList.toggle(
      "is-hovering",
      Boolean(clickable)
    );
  }



  /* ========================================================
     MOUSE MOVEMENT
     ======================================================== */

  window.addEventListener(
    "mousemove",
    updateCursor
  );



  /* ========================================================
     CLICK
     ======================================================== */

  window.addEventListener(
    "mousedown",
    () => {

      cursor.classList.add(
        "is-clicking"
      );

    }
  );


  window.addEventListener(
    "mouseup",
    () => {

      cursor.classList.remove(
        "is-clicking"
      );

    }
  );



  /* ========================================================
     LEAVE BROWSER WINDOW
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

    }
  );



  /* ========================================================
     BROWSER LOSES FOCUS
     ======================================================== */

  window.addEventListener(
    "blur",
    () => {

      cursor.classList.remove(
        "is-visible"
      );

      cursor.classList.remove(
        "is-clicking"
      );

    }
  );
}