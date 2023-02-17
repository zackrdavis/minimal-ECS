import { Entity } from "../ecs";

type XY = {
  x: number;
  y: number;
};

export type Ent = {
  style?: {
    color: string;
    width: number;
    height: number;
  };
  location?: XY;
  velocity?: XY;
  collision?: {
    width: number;
    height: number;
  };
  playerControl: {
    acceleration: number;
    maxSpeed: number;
  };
  friction: {
    coefficient: number;
  };
};

/**
 * Loop through all entities to find those with the needed components.
 * Run the callback on each one, providing both the current entity all of its peers.
 * @param components
 * @param entities
 * @param callback
 */
export function forEntsWith<C extends (keyof Ent)[]>(
  components: C,
  entities: Ent[],
  callback: (
    ent: Pick<Required<Ent>, C[number]> & Ent,
    peers: (Pick<Required<Ent>, C[number]> & Ent)[]
  ) => void
) {
  const filtered = entities.filter((ent) =>
    components.every((comp) => Object.keys(ent).includes(comp))
  ) as (Pick<Required<Ent>, C[number]> & Ent)[];

  for (let i = 0; i < filtered.length; i++) {
    const entity = filtered[i];
    const peers = [...filtered.slice(0, i), ...filtered.slice(i + 1)];

    callback(entity, peers);
  }
}

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
