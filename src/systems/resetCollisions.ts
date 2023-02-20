import { forEntsWith, Ent } from "./shared";

export class ResetCollisions {
  update(entities: Ent[]) {
    forEntsWith(["collisionEvent"], entities, (ent: Ent) => {
      delete ent.collisionEvent;
    });
  }
}
