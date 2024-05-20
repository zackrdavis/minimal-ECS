import { Entity } from "./entities";

// Adjust speed based on friction.
const decelerate = (speed: number, friction: number) => {
  if (speed >= 0) {
    return Math.max(speed - friction, 0);
  } else {
    return Math.min(speed + friction, 0);
  }
};

export const momentumSystem = (entities: Entity[]) => {
  for (const entity of entities) {
    if (entity.position && entity.velocity && entity.friction) {
      // Apply the velocity to the position.
      entity.position.x += entity.velocity.x;
      entity.position.y += entity.velocity.y;

      // Apply friction to the velocity.
      entity.velocity.x = decelerate(entity.velocity.x, entity.friction);
      entity.velocity.y = decelerate(entity.velocity.y, entity.friction);
    }
  }
};
