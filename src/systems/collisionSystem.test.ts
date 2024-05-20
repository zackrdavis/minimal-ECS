import { expect, test } from "vitest";
import { collisionSystem } from "./collisionSystem";
import { Entity } from "../types";

test("CollisionSystem registers collision and saves overlaps", () => {
  const ent1: Entity = {
    id: "1",
    position: { x: 0, y: 0 },
    collisionBox: { width: 10, height: 10, collisions: [] },
  };

  const ent2: Entity = {
    id: "2",
    position: { x: 5, y: 0 },
    collisionBox: { width: 10, height: 10, collisions: [] },
  };

  const exp1: Entity = {
    id: "1",
    position: { x: 0, y: 0 },
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
    position: { x: 5, y: 0 },
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

  collisionSystem([ent1, ent2]);

  expect(ent1).toEqual(exp1);
  expect(ent2).toEqual(exp2);
});

test("CollisionSystem clears previous collisions", () => {
  const ent1: Entity = {
    id: "1",
    position: { x: 0, y: 0 },
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

  collisionSystem([ent1]);

  expect(ent1.collisionBox?.collisions.length).toEqual(0);
});
