import { Entity } from "../ecs";
import { processEntitiesWith } from "./shared";

export class MomentumSystem {
  update(entities: Entity[]) {
    processEntitiesWith(["location", "velocity"], entities, (entity) => {
      const { x, y } = entity.get("location");
      const { x: vx, y: vy } = entity.get("velocity");

      entity.set({
        name: "location",
        x: x + vx,
        y: y + vy,
      });
    });
  }
}
