import { processEntitiesWith } from "./shared";
import { Entity } from "../ecs";

/**
 * Move speed toward 0 by [friction], stopping at zero.
 * @param speed
 * @param friction
 */
const applyFriction = (speed: number, friction: number) => {
  if (speed >= 0) {
    return Math.max(speed - friction, 0);
  } else {
    return Math.min(speed + friction, 0);
  }
};

export class FrictionSystem {
  update(entities: Entity[]) {
    processEntitiesWith(["friction", "velocity"], entities, (entity) => {
      const { coefficient } = entity.get("friction");
      const { x, y } = entity.get("velocity");

      entity.set({
        name: "velocity",
        x: applyFriction(x, coefficient),
        y: applyFriction(y, coefficient),
      });
    });
  }
}
