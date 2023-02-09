import "./style.css";
import typescriptLogo from "./typescript.svg";
import { mainLoop, Entity } from "./ecs";
import { IncrementSystem } from "./systems/shared";
import { DisplaySystem } from "./systems/display";

const incrEntity = new Entity([
  {
    name: "integer",
    value: 0,
  },
]);

const ent1 = new Entity([
  {
    name: "display",
    display: "",
  },
]);

mainLoop([ent1, incrEntity], [new IncrementSystem(), new DisplaySystem()]);

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
