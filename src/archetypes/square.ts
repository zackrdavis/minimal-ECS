import { Ent, uniqueNumber } from "../systems/shared";

type XY = {
  x: number;
  y: number;
};

type Square = {
  color: string;
  diameter: number;
  location: XY;
  velocity: XY;
};

export const archSquare = ({ color, diameter, location, velocity }: Square) =>
  ({
    id: uniqueNumber(),
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
    collisionBox: {
      width: diameter,
      height: diameter,
    },
    friction: {
      coefficient: 0.001,
    },
  } as Ent);
