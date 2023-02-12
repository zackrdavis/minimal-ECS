import { expect, test } from "vitest";
import { Entity } from "../ecs";
import { MomentumSystem } from "./momentum";

test("momentum_system_updates_location", () => {
  const momentumSystem = new MomentumSystem();

  const entity = new Entity([
    { name: "location", x: 0, y: 0 },
    { name: "velocity", x: 99, y: 99 },
  ]);

  const expectedLocation = {
    name: "location",
    x: 99,
    y: 99,
  };

  momentumSystem.update([entity]);

  const actualLocation = entity.get("location");

  expect(actualLocation).toEqual(expectedLocation);
});
