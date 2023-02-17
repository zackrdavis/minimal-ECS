import { Ent, forEntsWith } from "./shared";
import { decelerate } from "./shared";

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
