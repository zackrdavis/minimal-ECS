import { renderSystem } from "./renderSystem";
import { inputSystem } from "./inputSystem";
import { momentumSystem } from "./momentumSystem";
import { collisionSystem } from "./collisionSystem";
import { reboundSystem } from "./reboundSystem";
import { infectionSystem } from "./infectionSystem";
import { lurchSystem } from "./lurchSystem";
import { gameOverSystem } from "./gameOverSystem";
import { entities } from "./entities";

const systems = [
  inputSystem,
  renderSystem,
  reboundSystem,
  momentumSystem,
  collisionSystem,
  infectionSystem,
  lurchSystem,
  gameOverSystem,
];

// At each tick, run all systems against all entities.
const tick = () => {
  for (const system of systems) {
    system(entities);
  }
};

// Go!
setInterval(tick, 33);
