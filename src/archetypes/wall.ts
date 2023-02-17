import { Entity } from "../ecs";

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
  new Entity([
    {
      name: "style",
      width: dims.x,
      height: dims.y,
      color: color,
    },
    {
      name: "collision",
      width: dims.x,
      height: dims.y,
    },
    {
      name: "location",
      x: location.x,
      y: location.y,
    },
  ]);
