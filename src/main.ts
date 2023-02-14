import "./style.css";
import { mainLoop, Entity } from "./ecs";
import { IncrementSystem } from "./systems/shared";
import { DisplaySystem } from "./systems/display";
import { MomentumSystem } from "./systems/momentum";
import { CollisionSystem } from "./systems/collision";
import { PlayerControlSystem } from "./systems/playerControl";

type XY = {
  x: number;
  y: number;
};

const ballArchetype = ({
  color,
  diameter,
  location,
  velocity,
}: {
  color: string;
  diameter: number;
  location: XY;
  velocity: XY;
}) => {
  return new Entity([
    {
      name: "style",
      width: diameter,
      height: diameter,
      color: color,
    },
    {
      name: "location",
      x: location.x,
      y: location.y,
    },
    {
      name: "velocity",
      x: velocity.x,
      y: velocity.y,
    },
    {
      name: "collision",
      width: diameter,
      height: diameter,
    },
  ]);
};

const incrEntity = new Entity([
  {
    name: "integer",
    value: 0,
  },
]);

const ball1 = new Entity([
  {
    name: "style",
    width: 20,
    height: 20,
    color: "green",
  },
  {
    name: "location",
    x: 250,
    y: 250,
  },
  {
    name: "velocity",
    x: -1,
    y: -1,
  },
  {
    name: "collision",
    width: 20,
    height: 20,
  },
]);

const ball2 = new Entity([
  {
    name: "style",
    width: 20,
    height: 20,
    color: "red",
  },
  {
    name: "location",
    x: 290,
    y: 250,
  },
  {
    name: "velocity",
    x: 2,
    y: 1,
  },
  {
    name: "collision",
    width: 20,
    height: 20,
  },
]);

const ball3 = new Entity([
  {
    name: "style",
    width: 30,
    height: 30,
    color: "orange",
  },
  {
    name: "location",
    x: 300,
    y: 400,
  },
  {
    name: "velocity",
    x: -1,
    y: -2,
  },
  {
    name: "collision",
    width: 30,
    height: 30,
  },
]);

const ball4 = new Entity([
  {
    name: "style",
    width: 20,
    height: 20,
    color: "purple",
  },
  {
    name: "location",
    x: 240,
    y: 400,
  },
  {
    name: "velocity",
    x: -2,
    y: 2,
  },
  {
    name: "collision",
    width: 20,
    height: 20,
  },
]);

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

const player = ballArchetype({
  color: "tomato",
  diameter: 10,
  velocity: { x: 0, y: 0 },
  location: { x: 200, y: 200 },
});

player.set({ name: "playerControl" });

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
    new CollisionSystem(),
    new MomentumSystem(),
    new PlayerControlSystem(),
  ]
);
