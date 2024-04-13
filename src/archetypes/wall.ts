import { Ent } from "../systems/shared";

type XY = {
  x: number;
  y: number;
};

type Wall = Omit<Ent, "id"> & {
  dims: XY;
  location: XY;
};

export const archWall = ({ dims, location, ...extras }: Wall) =>
  ({
    id: crypto.randomUUID(),
    style: {
      width: dims.x,
      height: dims.y,
      color: "gray",
    },
    collisionBox: {
      width: dims.x,
      height: dims.y,
    },
    location: {
      x: location.x,
      y: location.y,
    },
    ...extras,
  } as Ent);
