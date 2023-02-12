import "./style.css";
import { mainLoop, Entity } from "./ecs";
import { IncrementSystem } from "./systems/shared";
import { DisplaySystem } from "./systems/display";
import { MomentumSystem } from "./systems/momentum";

const incrEntity = new Entity([
  {
    name: "integer",
    value: 0,
  },
]);

const ent1 = new Entity([
  {
    name: "style",
    width: 20,
    height: 20,
    color: "green",
  },
  {
    name: "location",
    x: 100,
    y: 100,
  },
  {
    name: "velocity",
    x: 5,
    y: 5,
  },
]);

mainLoop(
  [ent1, incrEntity],
  [new DisplaySystem(), new MomentumSystem(), new IncrementSystem()]
);
