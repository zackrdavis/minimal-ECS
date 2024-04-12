import { forEntsWith, Ent } from "./shared";

export class ImpactSystem {
  // Collects all velocity changes while we calculate them.
  // Apply only after we have calculated them all.
  updates: {
    entity: Ent;
    newVelX: number;
    newVelY: number;
    newPosX: number;
    newPosY: number;
  }[];

  constructor() {
    this.updates = [];
  }

  update(entities: Ent[]) {
    forEntsWith(
      ["collisionEvent", "velocity", "location"],
      entities,
      (entity1) => {
        const { x: vx1, y: vy1 } = entity1.velocity;
        const {
          entity: entity2,
          y: yCollision,
          x: xCollision,
        } = entity1.collisionEvent;

        const { x: vx2, y: vy2 } = entity2.velocity || { x: 0, y: 0 };

        // is the other entity immobile?
        const immobile2 = vx2 == 0 && vy2 == 0;

        // starting defaults
        let newVelX = 0;
        let newVelY = 0;
        let newPosX = entity1.location.x;
        let newPosY = entity1.location.y;

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

        // bump entity1 out of entity2 in case of overlap
        newPosX += newVelX;
        newPosY += newVelY;

        this.updates.push({
          entity: entity1,
          newVelX,
          newVelY,
          newPosX,
          newPosY,
        });
      }
    ); // ends forEntsWith

    // apply all saved velocities
    this.updates.forEach(({ entity, newVelX, newVelY, newPosX, newPosY }) => {
      if (entity.velocity && entity.location) {
        entity.velocity.x = newVelX;
        entity.velocity.y = newVelY;
        entity.location.x = newPosX;
        entity.location.y = newPosY;
      }
    });

    // clear updates
    this.updates = [];
  }
}
