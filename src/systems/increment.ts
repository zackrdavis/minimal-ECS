import { Ent, forEntsWith } from "./shared";

export class IncrementSystem {
  update(entities: Ent[]) {
    forEntsWith(["integer"], entities, (entity) => {
      entity.integer += 1;
    });
  }
}
