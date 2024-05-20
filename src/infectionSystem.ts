import { Entity } from "./entities";

export const infectionSystem = (entities: Entity[]) => {
  for (const entity of entities) {
    if (
      entity.infectable &&
      entity.appearance &&
      entity.collisionBox?.collisions.length
    ) {
      for (const collision of entity.collisionBox.collisions) {
        const otherEnt = entities.find(
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
  }
};
