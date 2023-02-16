import "./style.css";
import { mainLoop, Entity } from "./ecs";
import { IncrementSystem } from "./systems/shared";
import { DisplaySystem } from "./systems/display";
import { MomentumSystem } from "./systems/momentum";
import { CollisionSystem } from "./systems/collision";
import { PlayerControlSystem } from "./systems/playerControl";
import { FrictionSystem } from "./systems/friction";
import { archBall } from "./archetypes/ball";

const incrEntity = new Entity([
  {
    name: "integer",
    value: 0,
  },
]);

const player = archBall({
  color: "tomato",
  diameter: 20,
  velocity: { x: 0, y: 0 },
  location: { x: 200, y: 200 },
});
player.set({ name: "playerControl", rate: 0.5 });
player.set({ name: "friction", coefficient: 0.25 });

const ball1 = archBall({
  color: "green",
  diameter: 20,
  location: { x: 250, y: 250 },
  velocity: { x: -1, y: -1 },
});

const ball2 = archBall({
  color: "red",
  diameter: 20,
  location: { x: 290, y: 250 },
  velocity: { x: 2, y: 1 },
});

const ball3 = archBall({
  color: "orange",
  diameter: 20,
  location: { x: 300, y: 400 },
  velocity: { x: -1, y: -2 },
});

const ball4 = archBall({
  color: "purple",
  diameter: 20,
  location: { x: 240, y: 400 },
  velocity: { x: -2, y: -2 },
});

const topWall = new Entity([
  {
    name: "style",
    width: 460,
    height: 10,
    color: "blue",
  },
  {
    name: "collision",
    width: 460,
    height: 10,
  },
  {
    name: "location",
    x: 5,
    y: 60,
  },
  {
    name: "velocity",
    x: 0,
    y: 0,
  },
]);

const rightWall = new Entity([
  {
    name: "style",
    width: 20,
    height: 400,
    color: "blue",
  },
  {
    name: "collision",
    width: 20,
    height: 400,
  },
  {
    name: "location",
    x: 460,
    y: 80,
  },
  {
    name: "velocity",
    x: 0,
    y: 0,
  },
]);

const bottomWall = new Entity([
  {
    name: "style",
    width: 400,
    height: 10,
    color: "blue",
  },
  {
    name: "collision",
    width: 400,
    height: 10,
  },
  {
    name: "location",
    x: 50,
    y: 460,
  },
  {
    name: "velocity",
    x: 0,
    y: 0,
  },
]);

const leftWall = new Entity([
  {
    name: "style",
    width: 20,
    height: 400,
    color: "blue",
  },
  {
    name: "location",
    x: 10,
    y: 80,
  },
  {
    name: "collision",
    width: 20,
    height: 400,
  },
  {
    name: "velocity",
    x: 0,
    y: 0,
  },
]);

mainLoop(
  [
    ball1,
    ball2,
    ball3,
    ball4,
    topWall,
    player,
    rightWall,
    bottomWall,
    leftWall,
    incrEntity,
  ],
  [
    new DisplaySystem(),
    new MomentumSystem(),
    new CollisionSystem(),
    new PlayerControlSystem(),
    new FrictionSystem(),
  ]
);
