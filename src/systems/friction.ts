import { processEntitiesWith } from "./shared";
import { Entity } from "../ecs";
import { decelerate } from "./shared";

export class FrictionSystem {
  update(entities: Entity[]) {
    processEntitiesWith(["friction", "velocity"], entities, (entity) => {
      const { coefficient } = entity.get("friction");
      const { x, y } = entity.get("velocity");

      entity.set({
        name: "velocity",
        x: decelerate(x, coefficient),
        y: decelerate(y, coefficient),
      });
    });
  }
}
