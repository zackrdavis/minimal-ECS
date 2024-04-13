import { expect, test } from "vitest";
import { MomentumSystem } from "./momentum";
// for node.js env
const crypto = require("crypto");

test("momentum_system_updates_location", () => {
  const momentumSystem = new MomentumSystem();

  const entity = {
    id: crypto.randomUUID(),
    location: { x: 0, y: 0 },
    velocity: { x: 99, y: 99 },
  };

  const expectedLocation = { x: 99, y: 99 };

  momentumSystem.update([entity]);

  const actualLocation = entity.location;

  expect(actualLocation).toEqual(expectedLocation);
});
