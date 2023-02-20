import { forEntsWith, Ent } from "./shared";

export class ImpactSystem {
  // Collects all velocity changes while we calculate them.
  // Apply only after we have calculated them all.
  updates: { entity: Ent; newVelX: number; newVelY: number }[];

  constructor() {
    this.updates = [];
  }

  update(entities: Ent[]) {
    forEntsWith(["collisionEvent", "velocity"], entities, (entity1) => {
      const { x: vx1, y: vy1 } = entity1.velocity;
      const {
        entity: entity2,
        y: yCollision,
        x: xCollision,
      } = entity1.collisionEvent;

      const { x: vx2, y: vy2 } = entity2.velocity || { x: 0, y: 0 };

      const immobile2 = vx2 == 0 && vy2 == 0;

      let newVelX = 0;
      let newVelY = 0;

      if (xCollision && yCollision) {
        newVelX = immobile2 ? -vx1 : vx2;
        newVelY = immobile2 ? -vy1 : vy2;
      } else if (yCollision) {
        newVelX = immobile2 ? -vx1 : vx2;
        newVelY = vy1;
      } else if (xCollision) {
        newVelX = vx1;
        newVelY = immobile2 ? -vy1 : vy2;
      }

      this.updates.push({ entity: entity1, newVelX, newVelY });
    }); // ends forEntsWith

    // apply all saved velocities
    this.updates.forEach(({ entity, newVelX, newVelY }) => {
      if (entity.velocity) {
        entity.velocity.x = newVelX;
        entity.velocity.y = newVelY;
      }
    });

    // clear updates
    this.updates = [];
  }
}
