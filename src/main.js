import "./style.css";

import { createBackground } from "./components/Background";
import { createHero } from "./components/Hero";
import {
  createTetrahedron,
  startTetrahedronScene,
} from "./components/Tetrahedron";

document.querySelector("#app").innerHTML = `
  ${createBackground()}
  ${createHero()}
  ${createTetrahedron()}
`;

startTetrahedronScene();