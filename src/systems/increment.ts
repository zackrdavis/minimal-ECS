import { Entity } from "../ecs";
import { processEntitiesWith } from "./shared";

export class IncrementSystem {
  update(entities: Entity[]) {
    processEntitiesWith(["integer"], entities, (entity) => {
      const incrementComponent = entity.get("integer");
      console.log(incrementComponent.value);
      incrementComponent.value += 1;
    });
  }
}
