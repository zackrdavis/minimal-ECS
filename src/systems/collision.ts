import { Entity } from "../ecs";
import { processEntitiesWith } from "./shared";

export class CollisionSystem {
  canvas: HTMLCanvasElement | null;
  collisionEvent: any;

  constructor() {
    this.canvas = document.querySelector("#ecsCanvas");
    this.collisionEvent = new CustomEvent("collision");
  }

  update(entities: Entity[]) {
    // Collect all updated velocities.
    // Apply these all at once after all collisions are resolved.
    const newVelocities: { x: number; y: number }[] = [];

    processEntitiesWith(
      ["collision", "location"],
      entities,
      (entity1, otherEntities) => {
        // skip entities without velocity
        if (!entity1.has("velocity")) return;

        const { x: x1, y: y1 } = entity1.get("location");
        const { x: vx1, y: vy1 } = entity1.get("velocity");
        const { width: width1, height: height1 } = entity1.get("collision");
        let newVel = { x: vx1, y: vy1 };

        const left1 = x1;
        const right1 = x1 + width1;

        const top1 = y1;
        const bottom1 = y1 + height1;

        // compare edges with all other entities
        for (const entity2 of otherEntities) {
          const immobile2 = !entity2.has("velocity");

          const { x: x2, y: y2 } = entity2.get("location");

          // for entities without velocity, x:0 y:0
          const { x: vx2, y: vy2 } = entity2.get("velocity") || { x: 0, y: 0 };

          const { width: width2, height: height2 } = entity2.get("collision");

          const left2 = x2;
          const right2 = x2 + width2;

          const top2 = y2;
          const bottom2 = y2 + height2;

          let xOverlap = 0;
          let yOverlap = 0;

          if (right1 >= left2 && right2 >= right1) {
            // right1 on left2
            xOverlap = right1 - left2;
          } else if (right2 >= left1 && left2 <= left1) {
            // left1 on right2
            xOverlap = right2 - left1;
          }

          if (top1 <= bottom2 && top2 <= top1) {
            // top1 on bottom2
            yOverlap = bottom2 - top1;
          } else if (top2 <= bottom1 && bottom2 >= bottom1) {
            // bottom1 on top2
            yOverlap = bottom1 - top2;
          }

          if (xOverlap && yOverlap) {
            if (yOverlap > xOverlap) {
              // collision along y axis
              newVel = {
                x: immobile2 ? -vx1 : vx2,
                y: vy1,
              };
            } else if (xOverlap > yOverlap) {
              // collision along x axis
              newVel = {
                y: immobile2 ? -vy1 : vy2,
                x: vx1,
              };
            } else {
              // corner collision
              newVel = {
                y: immobile2 ? -vy1 : vy2,
                x: immobile2 ? -vx1 : vx2,
              };
            }

            const collision = new CustomEvent("collision", {
              detail: { ent1: entity1, ent2: entity2 },
            });
            this.canvas?.dispatchEvent(collision);
          }
        }

        newVelocities.push(newVel);
      }
    );

    // apply all saved velocities
    let i = 0;
    processEntitiesWith(
      ["collision", "location", "velocity"],
      entities,
      (entity) => {
        entity.set({
          name: "velocity",
          x: newVelocities[i].x,
          y: newVelocities[i].y,
        });

        i++;
      }
    );
  }
}
