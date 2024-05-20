import { renderSystem } from "./systems/renderSystem";
import { inputSystem } from "./systems/inputSystem";
import { momentumSystem } from "./systems/momentumSystem";
import { collisionSystem } from "./systems/collisionSystem";
import { reboundSystem } from "./systems/reboundSystem";
import { infectionSystem } from "./systems/infectionSystem";
import { lurchSystem } from "./systems/lurchSystem";
import { gameOverSystem } from "./systems/gameOverSystem";
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
