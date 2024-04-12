import { s } from "vitest/dist/env-afee91f0";
import { Ent, forEntsWith } from "./shared";

const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

export class PlayerControlSystem {
  keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
  };

  constructor() {
    window.addEventListener("keydown", (e) => {
      console.log(e.key);

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

  update(entities: Ent[]) {
    forEntsWith(["velocity", "playerControl"], entities, (entity) => {
      const { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, w, a, s, d } =
        this.keys;

      const right = ArrowRight || d;
      const left = ArrowLeft || a;
      const up = ArrowUp || w;
      const down = ArrowDown || s;

      const { acceleration, maxSpeed } = entity.playerControl;

      if ((right || left || down || up) && !entity.collisionEvent) {
        // accelerate up to maxSpeed
        const { x, y } = entity.velocity;

        const newXVel = x + (right ? acceleration : left ? -acceleration : 0);
        const newYVel = y + (down ? acceleration : up ? -acceleration : 0);

        entity.velocity = {
          x: clamp(newXVel, -maxSpeed, maxSpeed),
          y: clamp(newYVel, -maxSpeed, maxSpeed),
        };
      }
    });
  }
}
