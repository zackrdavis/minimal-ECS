import { expect, test } from "vitest";
import { momentumSystem } from "./momentumSystem";
import { Entity } from "../types";

test("Momentum system updates location and reduces velocity via friction", () => {
  const entity: Entity = {
    id: "test",
    position: { x: 0, y: 0 },
    velocity: { x: 99, y: 99 },
    friction: 1,
  };

  const expectedEntity: Entity = {
    id: "test",
    position: { x: 99, y: 99 },
    velocity: { x: 98, y: 98 },
    friction: 1,
  };

  momentumSystem([entity]);

  expect(entity).toEqual(expectedEntity);
});
