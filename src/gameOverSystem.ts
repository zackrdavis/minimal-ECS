import { Entity } from "./entities";

let didWin = false;
let didLose = false;

export const gameOverSystem = (entities: Entity[]) => {
  let humans = 0;
  let atGoal = 0;

  for (const entity of entities) {
    // Count uninfected humans.
    if (entity.infectable) {
      humans++;
    }

    // Loop through goal's collisions to check for survivors.
    if (entity.infectable && entity.collisionBox?.collisions.length) {
      for (const collision of entity.collisionBox.collisions) {
        const otherEnt = entities.find(
          (ent) => ent.id === collision.otherEntId
        );

        // Check if the other entity is uninfected.
        if (otherEnt?.goal) {
          atGoal++;
        }
      }
    }
  }

  if (humans === 0 && !didWin && !didLose) {
    didLose = true;
    entities.unshift(loseText);
  }

  if (atGoal >= 1 && !didWin && !didLose) {
    didWin = true;
    entities.unshift(winText);
  }
};

const winText = {
  id: "message",
  appearance: {
    color: "pink",
    width: 250,
    height: 60,
    text: "You Win!",
  },
  position: {
    x: 30,
    y: 120,
  },
};

const loseText = {
  id: "message",
  appearance: {
    color: "green",
    width: 280,
    height: 60,
    text: "You Lose!",
  },
  position: {
    x: 10,
    y: 120,
  },
};
