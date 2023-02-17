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

  update(entities: Ent[]) {
    forEntsWith(["velocity", "playerControl"], entities, (entity) => {
      const { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } = this.keys;
      const { acceleration, maxSpeed } = entity.playerControl;

      if (ArrowRight || ArrowLeft || ArrowDown || ArrowUp) {
        // accelerate up to maxSpeed
        const { x, y } = entity.velocity;

        const newXVel =
          x + (ArrowRight ? acceleration : ArrowLeft ? -acceleration : 0);
        const newYVel =
          y + (ArrowDown ? acceleration : ArrowUp ? -acceleration : 0);

        entity.velocity = {
          x: clamp(newXVel, -maxSpeed, maxSpeed),
          y: clamp(newYVel, -maxSpeed, maxSpeed),
        };
      }
    });
  }
}
