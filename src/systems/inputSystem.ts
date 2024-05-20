import { Entity } from "../types";

const maxSpeed = 7;
const accel = 3;

const pressedKeys: Record<string, boolean> = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  KeyW: false,
  KeyS: false,
  KeyA: false,
  KeyD: false,
};

let listenerSet = false;

// Minmax helper.
const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

export const inputSystem = (entities: Entity[]) => {
  if (!listenerSet) {
    // Setup keyboard listeners.
    window.addEventListener("keydown", (e) => {
      if (e.code in pressedKeys) pressedKeys[e.code] = true;
      e.preventDefault();
    });

    window.addEventListener("keyup", (e) => {
      if (e.code in pressedKeys) pressedKeys[e.code] = false;
      e.preventDefault();
    });

    listenerSet = true;
  }

  const { ArrowUp, ArrowLeft, ArrowDown, ArrowRight, KeyW, KeyA, KeyS, KeyD } =
    pressedKeys;

  // What direction is being pressed?
  const up = ArrowUp || KeyW;
  const left = ArrowLeft || KeyA;
  const down = ArrowDown || KeyS;
  const right = ArrowRight || KeyD;

  // Opposite directions cancel out the axis.
  const bothX = left && right;
  const bothY = up && down;

  if (right || left || down || up) {
    // Determine velocity change.
    const changeVelX = bothX ? 0 : right ? accel : left ? -accel : 0;
    const changeVelY = bothY ? 0 : down ? accel : up ? -accel : 0;

    for (const entity of entities) {
      if (
        entity.velocity &&
        entity.playerControl
        // // block controls on colliding entities
        // entity.collisionBox?.collisions.length === 0
      ) {
        const { x, y } = entity.velocity;

        // Determine the change in velocity.
        const newVelX = clamp(x + changeVelX, -maxSpeed, maxSpeed);
        const newVelY = clamp(y + changeVelY, -maxSpeed, maxSpeed);

        entity.velocity = {
          x: newVelX,
          y: newVelY,
        };
      }
    }
  }
};
