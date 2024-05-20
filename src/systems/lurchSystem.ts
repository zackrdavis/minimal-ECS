import { Entity } from "../types";
import { getEntsWithComps } from "../utils";

export const lurchSystem = (allEntities: Entity[]) => {
  const entities = getEntsWithComps(["velocity", "infectious"], allEntities);

  for (const entity of entities) {
    if (entity.velocity.x === 0 && entity.velocity.y === 0) {
      entity.velocity.x = Math.ceil(Math.random() * 10) - 5;
      entity.velocity.y = Math.ceil(Math.random() * 10) - 5;
    }
  }
};
