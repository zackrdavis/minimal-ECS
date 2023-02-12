import { Entity } from "../ecs";
import { processEntitiesWith } from "./shared";

export class CollisionSystem {
  update(entities: Entity[]) {
    processEntitiesWith(
      ["collision", "location", "velocity"],
      entities,
      (entity1, peers) => {
        const { x: x1, y: y1 } = entity1.get("location");
        const { width: width1, height: height1 } = entity1.get("collision");

        const left1 = x1;
        const right1 = x1 + width1;

        const top1 = y1;
        const bottom1 = y1 + height1;

        // compare edges with all peer entities
        for (const entity2 of peers) {
          const { x: x2, y: y2 } = entity2.get("location");
          const { width: width2, height: height2 } = entity2.get("collision");

          const left2 = x2;
          const right2 = x2 + width2;

          const top2 = y2;
          const bottom2 = y2 + height2;

          let xOverlap = 0;
          let yOverlap = 0;

          if (right1 >= left2 && right2 > right1) {
            // right1 on left2
            xOverlap = right1 - left2;
          } else if (right2 >= left1 && left2 < left1) {
            // left1 on right2
            xOverlap = right2 - left1;
          }

          if (top1 <= bottom2 && top2 < top1) {
            // top1 on bottom2
            yOverlap = bottom2 - top1;
          } else if (top2 <= bottom1 && bottom2 > bottom1) {
            // bottom1 on top2
            yOverlap = bottom1 - top2;
          }

          if (xOverlap && yOverlap) {
            const { x, y } = entity1.get("velocity");

            if (yOverlap > xOverlap) {
              // collision along y axis
              // reverse x velocity
              entity1.set({
                name: "velocity",
                x: -x,
                y: y,
              });
            } else if (xOverlap > yOverlap) {
              // collision along x axis
              // reverse y velocity
              entity1.set({
                name: "velocity",
                x: x,
                y: -y,
              });
            }
          }
        }
      }
    );
  }
}
