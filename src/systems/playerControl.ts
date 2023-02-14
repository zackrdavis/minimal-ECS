import { Entity } from "../ecs";
import { processEntitiesWith } from "./shared";

export class PlayerControlSystem {
  keys = {
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
      const { rate } = entity.get("playerControl");

      const newVel = {
        x: x + (this.keys.ArrowRight ? rate : this.keys.ArrowLeft ? -rate : 0),
        y: y + (this.keys.ArrowDown ? rate : this.keys.ArrowUp ? -rate : 0),
      };

      entity.set({ name: "velocity", ...newVel });
    });
  }
}
