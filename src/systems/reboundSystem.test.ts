import { expect, test } from "vitest";
import { Entity } from "../types";
import { reboundSystem } from "./reboundSystem";

test("ReboundSystem swaps velocities and updates position for single-axis collisions", () => {
  const ent1: Entity = {
    id: "1",
    velocity: { x: 1, y: 0 },
    position: { x: 0, y: 0 },
    rigidBody: { stuck: false },
    collisionBox: {
      width: 10,
      height: 10,
      collisions: [
        {
          otherEntId: "2",
          xOverlap: 5,
          yOverlap: 10,
        },
      ],
    },
  };

  const ent2: Entity = {
    id: "2",
    velocity: { x: -1, y: 0 },
    position: { x: 5, y: 0 },
    rigidBody: { stuck: false },
    collisionBox: {
      width: 10,
      height: 10,
      collisions: [
        {
          otherEntId: "1",
          xOverlap: -5,
          yOverlap: 10,
        },
      ],
    },
  };

  const exp1: Entity = {
    id: "1",
    velocity: { x: -1, y: 0 },
    position: { x: -5, y: 0 },
    rigidBody: { stuck: false },
    collisionBox: {
      width: 10,
      height: 10,
      collisions: [
        {
          otherEntId: "2",
          xOverlap: 5,
          yOverlap: 10,
        },
      ],
    },
  };

  const exp2: Entity = {
    id: "2",
    velocity: { x: 1, y: 0 },
    position: { x: 10, y: 0 },
    rigidBody: { stuck: false },
    collisionBox: {
      width: 10,
      height: 10,
      collisions: [
        {
          otherEntId: "1",
          xOverlap: -5,
          yOverlap: 10,
        },
      ],
    },
  };

  reboundSystem([ent1, ent2]);

  expect(ent1).toEqual(exp1);
  expect(ent2).toEqual(exp2);
});
