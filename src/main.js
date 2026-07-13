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

document.querySelector("#app").innerHTML = `
  ${createIntroScreen()}
  ${createProjectsPage()}

  <main
    class="homepage"
    id="homepage"
  >
    ${createBackground()}
    ${createHero()}
    ${createMainMenu()}
  </main>
`;

startIntroScreen();
startProjectsPage();
startMainMenu();