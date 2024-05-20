import { Entity } from "../types";

export const lurchSystem = (entities: Entity[]) => {
  for (const entity of entities) {
    if (entity.velocity && entity.infectious) {
      if (entity.velocity.x === 0 && entity.velocity.y === 0) {
        entity.velocity.x = Math.ceil(Math.random() * 10) - 5;
        entity.velocity.y = Math.ceil(Math.random() * 10) - 5;
      }
    }
  }
};
