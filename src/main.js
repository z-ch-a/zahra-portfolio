import "./style.css";


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
  startHomeCursor,
} from "./components/HomeCursor";


import {
  startBlinkingStars,
} from "./components/BlinkingStars";


import {
  startHomeTram,
} from "./components/HomeTram";



/* ==========================================================
   BUILD WEBSITE
   ========================================================== */

const app = document.querySelector("#app");


app.innerHTML = `
  ${createIntroScreen()}

  ${createProjectsPage()}

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

const background =
  createBackground();

homepage.prepend(background);



/* ==========================================================
   INITIALIZE
   ========================================================== */

/*
  IMPORTANT:
  Keep the original intro initialization first.
*/

startIntroScreen();

startProjectsPage();

startMainMenu();

startHomeCursor();

startBlinkingStars();

startHomeTram();