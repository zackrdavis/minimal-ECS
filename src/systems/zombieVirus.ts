import { Ent, forEntsWith } from "./shared";

export class ZombieVirus {
  update(entities: Ent[]) {
    forEntsWith(
      ["style", "collisionEvent", "velocity", "zombieVirus"],
      entities,
      (entity1) => {
        const entity2 = entity1.collisionEvent.entity;

        // if both entities have velocity and color, infect the second entity
        if (entity2?.velocity && entity2?.style?.color) {
          entity2.zombieVirus = true;
          entity2.style.color = "green";
        }
      }
    );
  }
}
