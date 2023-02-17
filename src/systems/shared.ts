export type Ent = {
  id: number;
  style?: {
    color: string;
    width: number;
    height: number;
  };
  location?: {
    x: number;
    y: number;
  };
  velocity?: {
    x: number;
    y: number;
  };
  collision?: {
    width: number;
    height: number;
  };
  playerControl?: {
    acceleration: number;
    maxSpeed: number;
  };
  friction?: {
    coefficient: number;
  };
  zombieVirus?: boolean;
};

export type TSystem = {
  update: Function;
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
