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

document.querySelector("#app").innerHTML = `
  ${createIntroScreen()}

  <main class="homepage">
    ${createBackground()}
    ${createHero()}
    ${createTetrahedron()}
  </main>
`;

startTetrahedronScene();
startIntroScreen();