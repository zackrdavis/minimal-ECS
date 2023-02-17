import { Entity } from "../ecs";
import { processEntitiesWith } from "./shared";
import { decelerate } from "./shared";

const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

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

      const { acceleration, deceleration, maxSpeed } =
        entity.get("playerControl");

      const {
        ArrowRight: right,
        ArrowLeft: left,
        ArrowUp: up,
        ArrowDown: down,
      } = this.keys;

      if ((x != 0 || y != 0) && !right && !left && !up && !down) {
        // if no keys pressed and moving, decelerate
        entity.set({
          name: "velocity",
          x: decelerate(x, deceleration),
          y: decelerate(y, deceleration),
        });
      } else {
        // accelerate up to maxSpeed
        const { x, y } = entity.get("velocity");

        const newXVel = x + (right ? acceleration : left ? -acceleration : 0);
        const newYVel = y + (down ? acceleration : up ? -acceleration : 0);

        entity.set({
          name: "velocity",
          x: clamp(newXVel, -maxSpeed, maxSpeed),
          y: clamp(newYVel, -maxSpeed, maxSpeed),
        });
      }
    });
  }
}
