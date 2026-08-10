import "./style.css";

import {
  startProjectMagnifier,
} from "./components/ProjectMagnifier";

import {
  createIntroScreen,
  startIntroScreen,
} from "./components/IntroScreen";


import {
  createBackground,
} from "./components/Background";


import {
  createHero,
} from "./components/Hero";


import {
  createMainMenu,
  startMainMenu,
} from "./components/MainMenu";


import {
  createProjectsPage,
  startProjectsPage,
} from "./components/ProjectsPage";


import {
  createProjectWindow,
  startProjectWindow,
} from "./components/ProjectWindow";


import {
  startHomeCursor,
} from "./components/HomeCursor";


import {
  startBlinkingStars,
} from "./components/BlinkingStars";


import {
  startHomeTram,
} from "./components/HomeTram";



/* ==========================================================
   GET APP
   ========================================================== */

const app =
  document.querySelector("#app");


if (!app) {
  throw new Error(
    'Could not find element with id="app".'
  );
}



/* ==========================================================
   BUILD WEBSITE
   ========================================================== */

app.innerHTML = `

  ${createIntroScreen()}


  ${createProjectsPage()}


  ${createProjectWindow()}


  <main
    class="homepage"
    id="homepage"
  >

    ${createHero()}

    ${createMainMenu()}

  </main>

`;



/* ==========================================================
   HOMEPAGE BACKGROUND
   ========================================================== */

const homepage =
  document.querySelector("#homepage");


if (homepage) {

  const background =
    createBackground();


  /*
    Background is inserted BEFORE
    Hero + Main Menu.
  */

  homepage.prepend(
    background
  );

}



/* ==========================================================
   START WEBSITE
   ========================================================== */

/*
  Intro must stay independent.
*/

startIntroScreen();


/*
  Projects carousel.
*/

startProjectsPage();


/*
  Floating project detail window.
*/

startProjectWindow();

startProjectMagnifier();


/*
  Homepage navigation.
*/

startMainMenu();


/*
  Shared custom cursor:
  intro + homepage + transition +
  projects + project window.
*/

startHomeCursor();


/*
  Homepage atmospheric effects.
*/

startBlinkingStars();

startHomeTram();