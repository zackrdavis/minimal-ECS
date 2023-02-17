import "./style.css";
import { Entity, TSystem } from "./ecs";

import { archBall } from "./archetypes/ball";
import { archWall } from "./archetypes/wall";

import { DisplaySystem } from "./systems/display";
import { MomentumSystem } from "./systems/momentum";
import { CollisionSystem } from "./systems/collision";
import { PlayerControlSystem } from "./systems/playerControl";
import { FrictionSystem } from "./systems/friction";
import { Ent } from "./systems/shared";

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

const topWall = archWall({
  dims: { x: 460, y: 10 },
  location: { x: 5, y: 60 },
  color: "blue",
});

const rightWall = archWall({
  dims: { x: 20, y: 400 },
  location: { x: 460, y: 80 },
  color: "blue",
});

const bottomWall = archWall({
  dims: { x: 400, y: 10 },
  location: { x: 50, y: 460 },
  color: "blue",
});

const leftWall = archWall({
  dims: { x: 20, y: 400 },
  location: { x: 10, y: 80 },
  color: "blue",
});

const player = archBall({
  color: "tomato",
  diameter: 20,
  velocity: { x: 0, y: 0 },
  location: { x: 200, y: 200 },
});
player.set({
  name: "playerControl",
  acceleration: 1,
  deceleration: 0.1,
  maxSpeed: 3,
});

const obj1 = {
  id: Date.now(),
  style: {
    width: 10,
    height: 10,
    color: "blue",
  },
  location: {
    x: 100,
    y: 100,
  },
  velocity: {
    x: 1,
    y: -1,
  },
};

const obj2 = {
  id: Date.now() + 1,
  style: {
    width: 20,
    height: 20,
    color: "green",
  },
  location: {
    x: 200,
    y: 200,
  },
  velocity: {
    x: -1,
    y: 1,
  },
};

const hWall1 = {
  id: Date.now() + 2,
  style: {
    width: 500,
    height: 20,
    color: "grey",
  },
  location: {
    x: 0,
    y: 0,
  },
};

const mainLoop = (entities: Ent[], systems: TSystem[]) => {
  const doTick = () => {
    for (const system of systems) {
      system.update(entities);
    }
  };

  setInterval(doTick, 10);
};

mainLoop(
  [
    // ball1,
    // ball2,
    // ball3,
    // ball4,
    // topWall,
    // rightWall,
    // bottomWall,
    // leftWall,
    // player,
    obj1,
    obj2,
    hWall1,
  ],
  [
    new DisplaySystem(),
    new MomentumSystem(),
    new CollisionSystem(),
    new PlayerControlSystem(),
    new FrictionSystem(),
  ]
);
