import { makeSquare, makeWall } from "./utils";

const player = makeSquare({
  role: "player",
  x: 100,
  y: 110,
});

const civ1 = makeSquare({
  role: "civilian",
  x: 15,
  y: 95,
});

const civ2 = makeSquare({
  role: "civilian",
  x: 50,
  y: 110,
});

const civ3 = makeSquare({
  role: "civilian",
  x: 20,
  y: 120,
});

const zombie1 = makeSquare({
  role: "zombie",
  x: 400,
  y: 140,
  vx: -0,
  vy: 1.5,
});

const zombie2 = makeSquare({
  role: "zombie",
  x: 200,
  y: 200,
  vx: 0.8,
  vy: -1,
});

const zombie3 = makeSquare({
  role: "zombie",
  x: 350,
  y: 300,
  vx: 0.8,
  vy: -1,
});

const zombie4 = makeSquare({
  role: "zombie",
  x: 200,
  y: 300,
  vx: -2,
  vy: 0,
});

const wallTop = makeWall({
  orientation: "x",
  length: 580,
  thickness: 10,
  x: 10,
  y: 0,
});

const wallBottom = makeWall({
  orientation: "x",
  length: 580,
  thickness: 20,
  x: 10,
  y: 590,
});

const wallLeft = makeWall({
  orientation: "y",
  length: 600,
  thickness: 10,
  x: 0,
  y: 0,
});

const wallRight = makeWall({
  orientation: "y",
  length: 600,
  thickness: 20,
  x: 590,
  y: 0,
});

const startWallTop = makeWall({
  orientation: "x",
  length: 110,
  thickness: 10,
  x: 10,
  y: 80,
});

const startWallBottom = makeWall({
  orientation: "x",
  length: 110,
  thickness: 10,
  x: 10,
  y: 150,
});

const midWall1 = makeWall({
  orientation: "x",
  length: 300,
  thickness: 10,
  x: 100,
  y: 500,
});

const midWall2 = makeWall({
  orientation: "y",
  length: 300,
  thickness: 10,
  x: 240,
  y: 130,
});

const midWall3 = makeWall({
  orientation: "x",
  length: 200,
  thickness: 10,
  x: 390,
  y: 300,
});

const goal = {
  id: "goal",
  goal: true,
  appearance: {
    width: 80,
    height: 80,
    color: "orange",
  },
  position: {
    x: 210,
    y: 510,
  },
  collisionBox: {
    width: 80,
    height: 40,
    collisions: [],
  },
};

export const entities = [
  goal,

  civ1,
  civ2,
  civ3,

  zombie1,
  zombie2,
  zombie3,
  zombie4,

  player,

  wallTop,
  wallBottom,
  wallLeft,
  wallRight,
  startWallTop,
  startWallBottom,
  midWall2,
  midWall1,
  midWall3,
];
