import { assert, expect, test } from "vitest";
import { Entity } from "./ecs";

test("set_and_get_component_by_name", () => {
  const entity = new Entity();

  const expected = {
    name: "integer",
    value: 13,
  };

  entity.set(expected);

  const actual = entity.get("integer");

  assert.equal(expected, actual);
});

test("set_overwrites_previous_component_of_same_name", () => {
  const entity = new Entity();

  const expected = {
    name: "integer",
    value: 13,
  };

  entity.set({
    name: "integer",
    value: 99,
  });

  entity.set(expected);

  const actual = entity.get("integer");

  assert.equal(expected, actual);
});

test("has_returns_true_if_component_exists", () => {
  const entity = new Entity([
    {
      name: "integer",
      value: 13,
    },
  ]);

  expect(entity.has("integer")).toBe(true);
  expect(entity.has("test")).toBe(false);
});
