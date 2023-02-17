import "./style.css";
import { TSystem } from "./ecs";

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
player.playerControl = {
  acceleration: 1,
  deceleration: 0.1,
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
    ball1,
    ball2,
    ball3,
    ball4,
    topWall,
    rightWall,
    bottomWall,
    leftWall,
    // player,
  ],
  [
    new DisplaySystem(),
    new MomentumSystem(),
    new CollisionSystem(),
    new PlayerControlSystem(),
    new FrictionSystem(),
  ]
);
