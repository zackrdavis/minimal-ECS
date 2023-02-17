import { forEntsWith, Ent } from "./shared";

export class MomentumSystem {
  update(entities: Ent[]) {
    forEntsWith(["location", "velocity"], entities, (ent) => {
      const { x, y } = ent.location;
      const { x: vx, y: vy } = ent.velocity;

      ent.location = {
        x: x + vx,
        y: y + vy,
      };
    });
  }
}
