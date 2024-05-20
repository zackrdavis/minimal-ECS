import { Entity } from "../types";
import { getEntsWithComps } from "../utils";

export const infectionSystem = (allEntities: Entity[]) => {
  const entities = getEntsWithComps(
    ["infectable", "appearance", "collisionBox", "id"],
    allEntities
  );

  for (const entity of entities) {
    for (const collision of entity.collisionBox.collisions) {
      const otherEnt = allEntities.find(
        (ent) => ent.id === collision.otherEntId
      );

      // Turn pink entity into a zombie.
      if (otherEnt?.infectious) {
        entity.infectious = true;
        entity.infectable = false;
        entity.appearance.color = "mediumSeaGreen";
      }
    }
  }
};
