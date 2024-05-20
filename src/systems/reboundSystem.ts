import { Entity } from "../types";

type Update = {
  entity: Entity;
  newVelX: number;
  newVelY: number;
  newPosX: number;
  newPosY: number;
};

// Store updates to apply after all entities have been checked.
const updates: Update[] = [];

export const reboundSystem = (entities: Entity[]) => {
  // Loop through all entities with velocity and collisions.
  for (const entity of entities) {
    if (
      entity.velocity &&
      entity.position &&
      entity.rigidBody &&
      entity.collisionBox?.collisions?.length
    ) {
      // Get current entity's velocity.
      let { x: vx1, y: vy1 } = entity.velocity;
      let { x: px1, y: py1 } = entity.position;

      // Loop through all collisions on a single entity.
      // These will alter the entity's velocity cumulatively.
      for (const collision of entity.collisionBox.collisions) {
        const { otherEntId, xOverlap, yOverlap } = collision;

        // Get the other entity.
        const otherEntity = entities.find((ent) => ent.id === otherEntId);

        // Skip if the other entity is not solid.
        if (!otherEntity?.rigidBody) continue;

        // Get the collision axis.
        const xCollision = Math.abs(yOverlap) > Math.abs(xOverlap);
        const yCollision = Math.abs(xOverlap) > Math.abs(yOverlap);
        const cornerCollision = Math.abs(xOverlap) === Math.abs(yOverlap);

        // Determine other's 'stuck' status.
        const otherStuck = otherEntity?.rigidBody.stuck;

        // Get the other entity's velocity.
        const { x: vx2, y: vy2 } = otherEntity?.velocity || { x: 0, y: 0 };

        // Add to new velocities.
        if (cornerCollision) {
          vx1 = otherStuck
            ? -vx1 // Bounce off immovable entity.
            : vx2; // Use velocity from movable entity.
          vy1 = otherStuck
            ? -vy1 // Bounce off immovable entity.
            : vy2; // Use velocity from movable entity.
        } else if (xCollision) {
          vx1 = otherStuck
            ? -vx1 // Bounce off immovable entity.
            : vx2; // Use velocity from movable entity.
          vy1 = vy1;
        } else if (yCollision) {
          vy1 = otherStuck
            ? -vy1 // Bounce off immovable entity.
            : vy2; // Use velocity from movable entity.
          vx1 = vx1;
        }

        // Adjust position to cancel overlap
        if (cornerCollision) {
          px1 -= xOverlap;
          py1 -= yOverlap;
        } else if (xCollision) {
          px1 -= xOverlap;
          py1 = py1;
        } else if (yCollision) {
          px1 = px1;
          py1 -= yOverlap;
        }
      }

      // Push to updates list.
      updates.push({
        entity,
        newVelX: vx1,
        newVelY: vy1,
        newPosX: px1,
        newPosY: py1,
      });
    }
  }

  // Apply updates.
  updates.forEach(({ entity, newVelX, newVelY, newPosX, newPosY }) => {
    if (entity.velocity && entity.position) {
      entity.velocity.x = newVelX;
      entity.velocity.y = newVelY;
      entity.position.x = newPosX;
      entity.position.y = newPosY;
    }
  });

  // Clear updates.
  updates.length = 0;
};
