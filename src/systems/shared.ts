import { Entity } from "../ecs";

export class IncrementSystem {
  update(entities: Entity[]) {
    for (const entity of entities) {
      if (entity.has("integer")) {
        const incrementComponent = entity.get("integer");
        console.log(incrementComponent.value);
        incrementComponent.value += 1;
      }
    }
  }
}
