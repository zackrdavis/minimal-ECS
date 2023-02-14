import { Entity } from "../ecs";
import { processEntitiesWith } from "./shared";

export class PlayerControlSystem {
  keys: {
    ArrowUp: boolean;
    ArrowDown: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
  } = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };

  constructor() {
    window.addEventListener("keydown", (e) => {
      const pressedKey = e.key as keyof typeof this.keys;

      if (pressedKey in this.keys) {
        this.keys[pressedKey] = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      const pressedKey = e.key as keyof typeof this.keys;

      if (pressedKey in this.keys) {
        this.keys[pressedKey] = false;
      }
    });
  }

  update(entities: Entity[]) {
    processEntitiesWith(["playerControl", "velocity"], entities, (entity) => {
      const { x, y } = entity.get("velocity");

      const newVel = {
        x: x + (this.keys.ArrowRight ? 1 : this.keys.ArrowLeft ? -1 : 0),
        y: y + (this.keys.ArrowDown ? 1 : this.keys.ArrowUp ? -1 : 0),
      };

      entity.set({ name: "velocity", ...newVel });
    });
  }
}
