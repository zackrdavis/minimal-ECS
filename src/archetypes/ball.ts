import { Ent } from "../systems/shared";

type XY = {
  x: number;
  y: number;
};

type Ball = {
  color: string;
  diameter: number;
  location: XY;
  velocity: XY;
};

export const archBall = ({ color, diameter, location, velocity }: Ball) =>
  ({
    style: {
      width: diameter,
      height: diameter,
      color: color,
    },
    location: {
      x: location.x,
      y: location.y,
    },
    velocity: {
      x: velocity.x,
      y: velocity.y,
    },
    collision: {
      width: diameter,
      height: diameter,
    },
  } as Ent);
