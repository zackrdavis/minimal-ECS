import { Ent } from "../systems/shared";

type XY = {
  x: number;
  y: number;
};

type Square = Omit<Ent, "id"> & {
  color: string;
  diameter: number;
  location: XY;
  velocity: XY;
};

export const archSquare = ({
  color,
  diameter,
  location,
  velocity,
  ...extras
}: Square) =>
  ({
    id: crypto.randomUUID(),
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
    ...extras,
  } as Ent);
