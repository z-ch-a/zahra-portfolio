import "../styles/menu.css";

import {
  runPageTransition,
} from "./PageTransition";


const menuItems = [
  {
    label: "ABOUT",
    page: "about",
  },

  {
    label: "PROJECTS",
    page: "projects",
  },

  {
    label: "PUBLICATIONS",
    page: "publications",
  },

  {
    label: "CONTACT",
    page: "contact",
  },
];


/* ==========================================================
   CREATE MENU
   ========================================================== */

export function createMainMenu() {

  const items = menuItems
    .map(
      (item, index) => `
        <button
          class="
            main-menu-item
            ${
              index === 0
                ? "main-menu-item--active"
                : ""
            }
          "
          type="button"
          data-menu-index="${index}"
          data-page="${item.page}"
        >

          <span class="main-menu-label">
            ${item.label}
          </span>

        </button>
      `
    )
    .join("");


  return `
    <nav
      class="main-menu"
      id="main-menu"
      aria-label="Main navigation"
    >

      <div class="main-menu-list">
        ${items}
      </div>

    </nav>
  `;
}


/* ==========================================================
   START MENU
   ========================================================== */

export function startMainMenu() {

  const menu =
    document.querySelector(
      "#main-menu"
    );


  if (!menu) return;


  const items =
    Array.from(
      menu.querySelectorAll(
        ".main-menu-item"
      )
    );


  if (!items.length) return;


  let activeIndex = 0;

  let navigationLocked = false;


  /* ========================================================
     ACTIVE ITEM
     ======================================================== */

  function setActiveItem(index) {

    activeIndex =
      (
        index +
        items.length
      ) %
      items.length;


    items.forEach(
      (
        item,
        itemIndex
      ) => {

        const isActive =
          itemIndex ===
          activeIndex;


        item.classList.toggle(
          "main-menu-item--active",
          isActive
        );


        if (isActive) {

          item.setAttribute(
            "aria-current",
            "page"
          );

        } else {

          item.removeAttribute(
            "aria-current"
          );
        }
      }
    );
  }


  /* ========================================================
     OPEN PAGE
     ======================================================== */

  async function openPage(
    pageName
  ) {

    if (navigationLocked) {
      return;
    }


    /* --------------------------------------------------------
       PROJECTS
       -------------------------------------------------------- */

    if (
      pageName ===
      "projects"
    ) {

      navigationLocked = true;


      await runPageTransition({

        title:
          "PROJECT ARCHIVE",

        status:
          "ACCESSING",


        onSwitch: () => {

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


          homepage.style.display =
            "none";


          projectsPage.hidden =
            false;

        },

      });


      navigationLocked = false;

      return;
    }


    /* --------------------------------------------------------
       OTHER PAGES
       -------------------------------------------------------- */

    window.dispatchEvent(
      new CustomEvent(
        "portfolio:navigate",
        {
          detail: {
            page: pageName,
          },
        }
      )
    );
  }


  /* ========================================================
     POINTER INTERACTION
     ======================================================== */

  items.forEach(
    (
      item,
      index
    ) => {

      item.addEventListener(
        "mouseenter",
        () => {

          setActiveItem(
            index
          );
        }
      );


      item.addEventListener(
        "focus",
        () => {

          setActiveItem(
            index
          );
        }
      );


      item.addEventListener(
        "click",
        () => {

          openPage(
            item.dataset.page
          );
        }
      );

    }
  );


  /* ========================================================
     KEYBOARD
     ======================================================== */

  window.addEventListener(
    "keydown",
    (event) => {

      const homepage =
        document.querySelector(
          "#homepage"
        );


      if (
        !homepage ||
        homepage.style.display ===
          "none"
      ) {
        return;
      }


      if (
        navigationLocked
      ) {
        return;
      }


      if (
        event.key ===
        "ArrowRight"
      ) {

        event.preventDefault();


        setActiveItem(
          activeIndex + 1
        );
      }


      if (
        event.key ===
        "ArrowLeft"
      ) {

        event.preventDefault();


        setActiveItem(
          activeIndex - 1
        );
      }


      if (
        event.key ===
        "Enter"
      ) {

        event.preventDefault();


        openPage(
          items[
            activeIndex
          ].dataset.page
        );
      }

    }
  );


  setActiveItem(0);
}