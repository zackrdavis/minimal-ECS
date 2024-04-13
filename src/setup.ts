import { archSquare } from "./archetypes/square";
import { archWall } from "./archetypes/wall";

const topWall = archWall({
  dims: { x: 600, y: 20 },
  location: { x: 0, y: 0 },
});

const rightWall = archWall({
  dims: { x: 20, y: 600 },
  location: { x: 580, y: 0 },
});

const bottomWall = archWall({
  dims: { x: 600, y: 20 },
  location: { x: 0, y: 580 },
});

const leftWall = archWall({
  dims: { x: 20, y: 600 },
  location: { x: 0, y: 0 },
});

const boxWallTop = archWall({
  dims: { x: 100, y: 20 },
  location: { x: 200, y: 180 },
});

const boxWallRight = archWall({
  dims: { x: 20, y: 100 },
  location: { x: 300, y: 200 },
});

const boxWallLeft = archWall({
  dims: { x: 20, y: 100 },
  location: { x: 180, y: 200 },
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
  velocity: { x: -1, y: -4 },
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
  // extras
  zombieVirus: true,
});

const player = archSquare({
  color: "magenta",
  diameter: 20,
  velocity: { x: 0, y: 0 },
  location: { x: 240, y: 240 },
  // extras
  playerControl: {
    acceleration: 1,
    maxSpeed: 3,
  },
  friction: {
    coefficient: 0.1,
  },
});

export const gameEntities = [
  topWall,
  rightWall,
  bottomWall,
  leftWall,
  boxWallTop,
  boxWallRight,
  boxWallLeft,
  square1,
  square2,
  square3,
  square4,
  square5,
  player,
];
