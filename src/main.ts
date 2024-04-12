import "./style.css";
import { Ent, TSystem } from "./systems/shared";
import { archSquare } from "./archetypes/square";
import { DisplaySystem } from "./systems/display";
import { MomentumSystem } from "./systems/momentum";
import { CollisionSystem } from "./systems/collision";
import { PlayerControlSystem } from "./systems/playerControl";
import { FrictionSystem } from "./systems/friction";
import { ZombieVirus } from "./systems/zombieVirus";
import { ResetCollisions } from "./systems/resetCollisions";
import { ImpactSystem } from "./systems/impact";
import { archWall } from "./archetypes/wall";

const topWall = archWall({
  color: "grey",
  dims: { x: 600, y: 20 },
  location: { x: 0, y: 0 },
});

const rightWall = archWall({
  color: "grey",
  dims: { x: 20, y: 600 },
  location: { x: 580, y: 0 },
});

const bottomWall = archWall({
  color: "grey",
  dims: { x: 600, y: 20 },
  location: { x: 0, y: 580 },
});

const leftWall = archWall({
  color: "grey",
  dims: { x: 20, y: 600 },
  location: { x: 0, y: 0 },
});

const boxWallTop = archWall({
  color: "grey",
  dims: { x: 100, y: 20 },
  location: { x: 200, y: 200 },
});

const boxWallRight = archWall({
  color: "grey",
  dims: { x: 20, y: 100 },
  location: { x: 280, y: 200 },
});

const boxWallLeft = archWall({
  color: "grey",
  dims: { x: 20, y: 100 },
  location: { x: 200, y: 200 },
});

const square1 = archSquare({
  color: "tomato",
  diameter: 20,
  location: { x: 500, y: 500 },
  velocity: { x: -1, y: -1 },
});

const square2 = archSquare({
  color: "red",
  diameter: 20,
  location: { x: 350, y: 250 },
  velocity: { x: 2, y: 1 },
});

const square3 = archSquare({
  color: "orange",
  diameter: 20,
  location: { x: 400, y: 400 },
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
  location: { x: 300, y: 340 },
});

const square6 = archSquare({
  color: "magenta",
  diameter: 20,
  velocity: { x: 0, y: 0 },
  location: { x: 240, y: 240 },
});

square5.zombieVirus = true;

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
    boxWallTop,
    boxWallRight,
    boxWallLeft,
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
