import { Ent, forEntsWith } from "./shared";

export class ZombieVirus {
  update(entities: Ent[]) {
    forEntsWith(
      ["style", "collisionEvent", "velocity", "zombieVirus"],
      entities,
      (entity1) => {
        const entity2 = entity1.collisionEvent.entity;

        const { x: x1, y: y1 } = entity1.velocity;
        const { x: x2, y: y2 } = entity2.velocity || { x: 0, y: 0 };
        const speed1 = Math.sqrt(x1 ** 2 + y1 ** 2);
        const speed2 = Math.sqrt(x2 ** 2 + y2 ** 2);

        // if zombie (entity1) has a higher speed than entity2, transmit zombieVirus
        if (speed1 > speed2 && entity2?.style?.color) {
          entity2.zombieVirus = true;
          entity2.style.color = "green";
        }
      }
    );
  }
}
