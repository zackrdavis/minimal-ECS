import { Entity } from "../types";

export const collisionSystem = (entities: Entity[]) => {
  // Get entities with collisionBox and position.
  const withNeeded = entities.filter(
    (e) => e.collisionBox && e.position && e.id
  ) as Pick<Required<Entity>, "collisionBox" | "position" | "id">[];

  withNeeded.forEach((entity1) => {
    // Get peers without the current entity.
    const peers = withNeeded.filter((e) => e !== entity1);

    // Reset collision events.
    entity1.collisionBox.collisions.length = 0;

    const left1 = entity1.position.x;
    const right1 = entity1.position.x + entity1.collisionBox.width;
    const xCenter1 = entity1.position.x + entity1.collisionBox.width / 2;

    const top1 = entity1.position.y;
    const bottom1 = entity1.position.y + entity1.collisionBox.height;
    const yCenter1 = entity1.position.y + entity1.collisionBox.height / 2;

    // Compare edges with all peers.
    for (const entity2 of peers) {
      const left2 = entity2.position.x;
      const right2 = entity2.position.x + entity2.collisionBox.width;
      const xCenter2 = entity2.position.x + entity2.collisionBox.width / 2;

      const top2 = entity2.position.y;
      const bottom2 = entity2.position.y + entity2.collisionBox.height;
      const yCenter2 = entity2.position.y + entity2.collisionBox.height / 2;

      const colliding =
        right1 > left2 && left1 < right2 && bottom1 > top2 && top1 < bottom2;

      if (colliding) {
        let xOverlap = 0;
        let yOverlap = 0;

        if (xCenter1 <= xCenter2) {
          // Arriving from left
          xOverlap = right1 - left2;
        } else if (xCenter1 >= xCenter2) {
          // Arriving from right
          xOverlap = left1 - right2;
        }

        if (yCenter1 <= yCenter2) {
          // Arriving from top
          yOverlap = bottom1 - top2;
        } else if (yCenter1 >= yCenter2) {
          // Arriving from bottom
          yOverlap = top1 - bottom2;
        }

        entity1.collisionBox.collisions.push({
          otherEntId: entity2.id,
          xOverlap,
          yOverlap,
        });
      }
    }
  });
};
