import { Entity } from "../ecs";

type XY = {
  x: number;
  y: number;
};

export const archBall = ({
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