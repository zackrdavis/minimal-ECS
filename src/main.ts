import "./style.css";
import typescriptLogo from "./typescript.svg";
import { mainLoop, Entity } from "./ecs";
import { IncrementSystem } from "./systems/shared";

const incrSystem = new IncrementSystem();

const incrEntity = new Entity([
  {
    name: "integer",
    value: 0,
  },
]);

const ent1 = new Entity([
  {
    name: "position",
    x: 100,
    y: 100,
  },
  {
    name: "style",
    style: {
      width: 100,
      height: 100,
      background: "blue",
      position: "absolute",
    },
  },
]);

const ent2 = new Entity([
  {
    name: "position",
    x: 100,
    y: 100,
  },
  {
    name: "style",
    style: {
      width: 100,
      height: 100,
      background: "blue",
      position: "absolute",
    },
  },
]);

mainLoop([ent1, ent2, incrEntity], [incrSystem]);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript
    </h1>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;
