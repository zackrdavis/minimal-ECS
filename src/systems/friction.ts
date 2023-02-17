import { Ent, forEntsWith } from "./shared";

/**
 * Move speed toward 0 by [friction], stopping at zero.
 * @param speed
 * @param friction
 */
const decelerate = (speed: number, friction: number) => {
  if (speed >= 0) {
    return Math.max(speed - friction, 0);
  } else {
    return Math.min(speed + friction, 0);
  }
};

export class FrictionSystem {
  update(entities: Ent[]) {
    forEntsWith(["friction", "velocity"], entities, (entity) => {
      const { coefficient } = entity.friction;
      const { x, y } = entity.velocity;

      entity.velocity = {
        x: decelerate(x, coefficient),
        y: decelerate(y, coefficient),
      };
    });
  }
}
