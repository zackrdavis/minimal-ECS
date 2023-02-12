export type TComponent = {
  name: string; // position, health, etc.
  [key: string]: any; // all actual data, e.g. health: 100
};

type TSystem = {
  update: Function;
};

export class Entity {
  // hashmap of components
  components: { [key: string]: TComponent };

  constructor(initComps?: TComponent[]) {
    // built initial list of components if provided
    this.components = {};
    initComps &&
      initComps.forEach((comp) => (this.components[comp.name] = comp));
  }

  set(component: TComponent) {
    const key = component.name;
    this.components[key] = component;
  }

  get(name: string) {
    return this.components[name];
  }

  has(name: string) {
    return this.get(name) !== undefined;
  }
}

export const mainLoop = (entities: Entity[], systems: TSystem[]) => {
  let tickInterval = setInterval(() => {});

  let ticks = 0;

  const doTick = () => {
    if (ticks >= 100) {
      clearInterval(tickInterval);
    }

    for (const system of systems) {
      system.update(entities);
    }

    ticks += 1;
  };

  tickInterval = setInterval(doTick, 100);
};
