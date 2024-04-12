import { Ent } from "../systems/shared";

type XY = {
  x: number;
  y: number;
};

type Wall = {
  color: string;
  dims: XY;
  location: XY;
};

export const archWall = ({ color, dims, location }: Wall) =>
  ({
    id: crypto.randomUUID(),
    style: {
      width: dims.x,
      height: dims.y,
      color: color,
    },
    collisionBox: {
      width: dims.x,
      height: dims.y,
    },
    location: {
      x: location.x,
      y: location.y,
    },
  } as Ent);
