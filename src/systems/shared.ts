import { Entity } from "../ecs";

// check if an entity has all required components
const entityHasAllComps = (testEntity: Entity, compNames: string[]) => {
  // loop through compNames
  for (const compName of compNames) {
    // if missing from entity, exit with false
    if (!testEntity.has(compName)) return false;
  }

  // otherwise the entity has all the components
  return true;
};

export const processEntitiesWith = (
  compNames: string[],
  entities: Entity[],
  callback: (entity: Entity, peers: Entity[]) => void
) => {
  const validEntities = entities.filter((e) => entityHasAllComps(e, compNames));

  for (let i = 0; i < validEntities.length; i++) {
    const entity = validEntities[i];
    const peers = [...validEntities.slice(0, i), ...validEntities.slice(i + 1)];

    callback(entity, peers);
  }
};

/**
 * Move speed toward 0 by [friction], stopping at zero.
 * @param speed
 * @param friction
 */
export const decelerate = (speed: number, friction: number) => {
  if (speed >= 0) {
    return Math.max(speed - friction, 0);
  } else {
    return Math.min(speed + friction, 0);
  }
};
