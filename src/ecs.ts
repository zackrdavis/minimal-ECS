type Component = {
  name: string; // position, health, etc.
  [key: string]: any; // all actual data, e.g. health: 100
};

export class Entity {
  components: { [key: string]: Component };

  constructor(initComps?: Component[]) {
    this.components = {};
    initComps &&
      initComps.forEach((comp) => (this.components[comp.name] = comp));
  }

  set(component: Component) {
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
