import "./style.css";

import {
  createIntroScreen,
  startIntroScreen,
} from "./components/IntroScreen";

import { createBackground } from "./components/Background";
import { createHero } from "./components/Hero";

import {
  createTetrahedron,
  startTetrahedronScene,
} from "./components/Tetrahedron";

import {
  createProjectsPage,
  startProjectsPage,
} from "./components/ProjectsPage";

document.querySelector("#app").innerHTML = `
  ${createIntroScreen()}
  ${createProjectsPage()}

  <main class="homepage" id="homepage">
    ${createBackground()}
    ${createHero()}
    ${createTetrahedron()}
  </main>
`;

startTetrahedronScene();
startIntroScreen();
startProjectsPage();