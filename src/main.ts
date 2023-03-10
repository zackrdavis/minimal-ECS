import "./style.css";
import { Ent, TSystem, uniqueNumber } from "./systems/shared";
import { archSquare } from "./archetypes/square";
import { DisplaySystem } from "./systems/display";
import { MomentumSystem } from "./systems/momentum";
import { CollisionSystem } from "./systems/collision";
import { PlayerControlSystem } from "./systems/playerControl";
import { FrictionSystem } from "./systems/friction";
import { ZombieVirus } from "./systems/zombieVirus";
import { ResetCollisions } from "./systems/resetCollisions";
import { ImpactSystem } from "./systems/impact";

const topWall = {
  id: uniqueNumber(),
  style: {
    width: 460,
    height: 20,
    color: "grey",
  },
  collisionBox: {
    width: 460,
    height: 20,
  },
  location: {
    x: 5,
    y: 10,
  },
};

const rightWall = {
  id: uniqueNumber(),
  style: {
    width: 20,
    height: 580,
    color: "grey",
  },
  collisionBox: {
    width: 20,
    height: 580,
  },
  location: {
    x: 480,
    y: 10,
  },
};

const bottomWall = {
  id: uniqueNumber(),
  style: {
    width: 420,
    height: 20,
    color: "grey",
  },
  collisionBox: {
    width: 420,
    height: 20,
  },
  location: {
    x: 40,
    y: 570,
  },
};

const leftWall = {
  id: uniqueNumber(),
  style: {
    width: 20,
    height: 590,
    color: "grey",
  },
  collisionBox: {
    width: 20,
    height: 590,
  },
  location: {
    x: 10,
    y: 20,
  },
};

const square1 = archSquare({
  color: "magenta",
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

const square5 = archSquare({
  color: "green",
  diameter: 20,
  velocity: { x: -3, y: -0.5 },
  location: { x: 300, y: 300 },
});
square5.zombieVirus = true;

const square6 = archSquare({
  color: "tomato",
  diameter: 20,
  velocity: { x: 0, y: 0 },
  location: { x: 200, y: 200 },
});
square6.friction = {
  coefficient: 0.1,
};
square6.playerControl = {
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
    square5,
    square6,
    topWall,
    rightWall,
    bottomWall,
    leftWall,
  ],
  [
    new DisplaySystem(),
    new MomentumSystem(),
    new CollisionSystem(),
    new ImpactSystem(),
    new PlayerControlSystem(),
    new FrictionSystem(),
    new ZombieVirus(),
    new ResetCollisions(),
  ]
);
