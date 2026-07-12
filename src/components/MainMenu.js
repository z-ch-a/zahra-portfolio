const menuItems = [
  {
    label: "PROJECTS",
    page: "projects",
  },
  {
    label: "ABOUT",
    page: "about",
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

export function createMainMenu() {
  const items = menuItems
    .map(
      (item, index) => `
        <button
          class="main-menu-item ${
            index === 0 ? "main-menu-item--active" : ""
          }"
          type="button"
          data-menu-index="${index}"
          data-page="${item.page}"
        >
          <span class="main-menu-selector" aria-hidden="true">
            &gt;
          </span>

          <span class="main-menu-label" data-text="${item.label}">
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
      aria-label="Portfolio navigation"
    >
      ${items}
    </nav>
  `;
}

export function startMainMenu() {
  const menu = document.querySelector("#main-menu");

  if (!menu) return;

  const items = Array.from(
    menu.querySelectorAll(".main-menu-item")
  );

  if (!items.length) return;

  let activeIndex = 0;

  function setActiveItem(index) {
    activeIndex =
      (index + items.length) % items.length;

    items.forEach((item, itemIndex) => {
      item.classList.toggle(
        "main-menu-item--active",
        itemIndex === activeIndex
      );
    });
  }

  function openPage(pageName) {
    if (pageName === "projects") {
      const homepage =
        document.querySelector("#homepage");

      const projectsPage =
        document.querySelector("#projects-page");

      if (!homepage || !projectsPage) return;

      homepage.style.display = "none";
      projectsPage.hidden = false;

      return;
    }

    window.dispatchEvent(
      new CustomEvent("portfolio:navigate", {
        detail: {
          page: pageName,
        },
      })
    );
  }

  items.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      setActiveItem(index);
    });

    item.addEventListener("focus", () => {
      setActiveItem(index);
    });

    item.addEventListener("click", () => {
      openPage(item.dataset.page);
    });
  });

  window.addEventListener("keydown", (event) => {
    const homepage =
      document.querySelector("#homepage");

    if (
      !homepage ||
      homepage.style.display === "none"
    ) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveItem(activeIndex + 1);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveItem(activeIndex - 1);
    }

    if (event.key === "Enter") {
      event.preventDefault();

      openPage(
        items[activeIndex].dataset.page
      );
    }
  });

  setActiveItem(0);
}