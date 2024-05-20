import { Entity } from "../types";
import { getEntsWithComps } from "../utils";

export const infectionSystem = (ents: Entity[]) => {
  const entities = getEntsWithComps(
    ["infectable", "appearance", "collisionBox", "id"],
    ents
  );

  for (const entity of entities) {
    console.log(entity.infectable);

    for (const collision of entity.collisionBox.collisions) {
      const otherEnt = entities.find((ent) => ent.id === collision.otherEntId);

      // Turn pink entity into a zombie.
      if (otherEnt?.infectious) {
        entity.infectious = true;
        entity.infectable = false;
        entity.appearance.color = "mediumSeaGreen";
      }
    }
  }
};
