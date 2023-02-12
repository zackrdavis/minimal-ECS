import { Entity } from "../ecs";

export class MomentumSystem {
  update(entities: Entity[]) {
    for (const entity of entities) {
      if (entity.has("location") && entity.has("velocity")) {
        const { x, y } = entity.get("location");
        const { x: vx, y: vy } = entity.get("velocity");

        entity.set({
          name: "location",
          x: x + vx,
          y: y + vy,
        });
      }
    }
  }
}
