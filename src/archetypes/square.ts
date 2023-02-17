import { Ent } from "../systems/shared";

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
    friction: {
      coefficient: 0.003,
    },
  } as Ent);
