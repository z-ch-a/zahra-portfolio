import "../styles/project-magnifier.css";


export function startProjectMagnifier() {

  /* ========================================================
     PREVENT DUPLICATES
     ======================================================== */

  const existingMagnifier =
    document.querySelector(
      "#project-magnifier"
    );


  if (existingMagnifier) {
    return;
  }



  /* ========================================================
     SETTINGS
     ======================================================== */

  const ZOOM = 2;

  const LENS_SIZE = 140;



  /* ========================================================
     CREATE MAGNIFIER
     ======================================================== */

  const magnifier =
    document.createElement("div");


  magnifier.className =
    "project-magnifier";


  magnifier.id =
    "project-magnifier";


  magnifier.innerHTML = `
    <div class="project-magnifier-crosshair">
      <span class="project-magnifier-crosshair-horizontal"></span>
      <span class="project-magnifier-crosshair-vertical"></span>
      <span class="project-magnifier-crosshair-dot"></span>
    </div>
  `;


  document.body.appendChild(
    magnifier
  );



  /* ========================================================
     VARIABLES
     ======================================================== */

  let activePage = null;

  let activeImage = null;

  let lastMouseX = 0;

  let lastMouseY = 0;

  let isMagnifying = false;



  /* ========================================================
     NORMAL CUSTOM CURSOR
     ======================================================== */

  function getCustomCursor() {

    return document.querySelector(
      "#home-cursor"
    );

  }



  /* ========================================================
     CHECK IF PROJECT WINDOW IS OPEN
     ======================================================== */

  function projectWindowIsOpen() {

    const overlay =
      document.querySelector(
        "#project-window-overlay"
      );


    return (
      overlay &&
      !overlay.hidden
    );

  }



  /* ========================================================
     START MAGNIFYING
     ======================================================== */

  function showMagnifier(
    page,
    image
  ) {

    if (
      !page ||
      !image
    ) {
      return;
    }


    activePage =
      page;


    activeImage =
      image;


    isMagnifying =
      true;


    magnifier.classList.add(
      "project-magnifier--visible"
    );


    const customCursor =
      getCustomCursor();


    if (customCursor) {

      customCursor.classList.add(
        "is-magnifying"
      );

    }

  }



  /* ========================================================
     STOP MAGNIFYING
     ======================================================== */

  function hideMagnifier() {

    isMagnifying =
      false;


    activePage =
      null;


    activeImage =
      null;


    magnifier.classList.remove(
      "project-magnifier--visible"
    );


    const customCursor =
      getCustomCursor();


    if (customCursor) {

      customCursor.classList.remove(
        "is-magnifying"
      );

    }

  }



  /* ========================================================
     UPDATE MAGNIFIED IMAGE
     ======================================================== */

  function updateMagnifier(
    mouseX,
    mouseY
  ) {

    if (
      !isMagnifying ||
      !activePage ||
      !activeImage
    ) {
      return;
    }


    const imageRect =
      activeImage.getBoundingClientRect();



    /*
      If mouse moved outside the actual
      portfolio image, stop magnifying.
    */

    const insideImage =
      mouseX >= imageRect.left &&
      mouseX <= imageRect.right &&
      mouseY >= imageRect.top &&
      mouseY <= imageRect.bottom;


    if (!insideImage) {

      hideMagnifier();

      return;
    }



    /* ------------------------------------------------------
       POSITION LENS
       ------------------------------------------------------ */

    magnifier.style.left =
      `${mouseX}px`;


    magnifier.style.top =
      `${mouseY}px`;



    /* ------------------------------------------------------
       POSITION WITHIN SOURCE IMAGE
       ------------------------------------------------------ */

    const localX =
      mouseX -
      imageRect.left;


    const localY =
      mouseY -
      imageRect.top;



    /* ------------------------------------------------------
       BACKGROUND IMAGE
       ------------------------------------------------------ */

    magnifier.style.backgroundImage =
      `url("${activeImage.currentSrc || activeImage.src}")`;



    /* ------------------------------------------------------
       MAGNIFIED SIZE
       ------------------------------------------------------ */

    const zoomedWidth =
      imageRect.width *
      ZOOM;


    const zoomedHeight =
      imageRect.height *
      ZOOM;


    magnifier.style.backgroundSize =
      `${zoomedWidth}px ${zoomedHeight}px`;



    /* ------------------------------------------------------
       BACKGROUND POSITION

       Keeps exact mouse position in
       the center of the lens.
       ------------------------------------------------------ */

    const backgroundX =
      LENS_SIZE / 2 -
      localX *
      ZOOM;


    const backgroundY =
      LENS_SIZE / 2 -
      localY *
      ZOOM;


    magnifier.style.backgroundPosition =
      `${backgroundX}px ${backgroundY}px`;

  }



  /* ========================================================
     MOUSE MOVE
     ======================================================== */

  window.addEventListener(
    "mousemove",
    (event) => {

      lastMouseX =
        event.clientX;


      lastMouseY =
        event.clientY;



      /*
        Magnifier should only work
        while project viewer is open.
      */

      if (
        !projectWindowIsOpen()
      ) {

        hideMagnifier();

        return;

      }



      /*
        Detect portfolio page beneath
        the mouse.
      */

      const page =
        event.target.closest
          ? event.target.closest(
              ".project-document-page"
            )
          : null;


      if (!page) {

        hideMagnifier();

        return;

      }



      const image =
        page.querySelector(
          ".project-document-image"
        );


      if (!image) {

        hideMagnifier();

        return;

      }



      /*
        Start lens if this is a new page.
      */

      if (
        page !== activePage
      ) {

        showMagnifier(
          page,
          image
        );

      }



      updateMagnifier(
        event.clientX,
        event.clientY
      );

    }
  );



  /* ========================================================
     UPDATE WHILE SCROLLING
     ======================================================== */

  window.addEventListener(
    "scroll",
    () => {

      if (
        isMagnifying
      ) {

        updateMagnifier(
          lastMouseX,
          lastMouseY
        );

      }

    },
    true
  );



  /* ========================================================
     WINDOW RESIZE
     ======================================================== */

  window.addEventListener(
    "resize",
    () => {

      if (
        isMagnifying
      ) {

        updateMagnifier(
          lastMouseX,
          lastMouseY
        );

      }

    }
  );



  /* ========================================================
     LEAVE DOCUMENT
     ======================================================== */

  document.addEventListener(
    "mouseleave",
    hideMagnifier
  );



  /* ========================================================
     WINDOW LOSES FOCUS
     ======================================================== */

  window.addEventListener(
    "blur",
    hideMagnifier
  );

}