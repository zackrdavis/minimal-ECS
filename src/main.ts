import "./style.css";
import { TSystem } from "./ecs";

import { archSquare } from "./archetypes/square";
import { archWall } from "./archetypes/wall";

import { DisplaySystem } from "./systems/display";
import { MomentumSystem } from "./systems/momentum";
import { CollisionSystem } from "./systems/collision";
import { PlayerControlSystem } from "./systems/playerControl";
import { FrictionSystem } from "./systems/friction";
import { Ent } from "./systems/shared";

const square1 = archSquare({
  color: "green",
  diameter: 20,
  location: { x: 250, y: 250 },
  velocity: { x: -1, y: -1 },
});

const square2 = archSquare({
  color: "red",
  diameter: 20,
  location: { x: 290, y: 250 },
  velocity: { x: 2, y: 1 },
});

const square3 = archSquare({
  color: "orange",
  diameter: 20,
  location: { x: 300, y: 400 },
  velocity: { x: -1, y: -2 },
});

const square4 = archSquare({
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

const player = archSquare({
  color: "tomato",
  diameter: 20,
  velocity: { x: 0, y: 0 },
  location: { x: 200, y: 200 },
});
player.friction = {
  coefficient: 0.1,
};
player.playerControl = {
  acceleration: 1,
  maxSpeed: 3,
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
    square1,
    square2,
    square3,
    square4,
    topWall,
    rightWall,
    bottomWall,
    leftWall,
    player,
  ],
  [
    new DisplaySystem(),
    new MomentumSystem(),
    new CollisionSystem(),
    new FrictionSystem(),
    new PlayerControlSystem(),
  ]
);
