import { Ent, TSystem } from "./systems/shared";
import { gameEntities } from "./setup";
import { DisplaySystem } from "./systems/display";
import { MomentumSystem } from "./systems/momentum";
import { CollisionSystem } from "./systems/collision";
import { PlayerControlSystem } from "./systems/playerControl";
import { FrictionSystem } from "./systems/friction";
import { ZombieVirus } from "./systems/zombieVirus";
import { ResetCollisions } from "./systems/resetCollisions";
import { ImpactSystem } from "./systems/impact";

// At each tick, run all systems.
// Each system processes all entities, acting only on those with the necessary properties.
const mainLoop = (entities: Ent[], systems: TSystem[]) => {
  const tick = () => {
    for (const system of systems) {
      system.update(entities);
    }
  };

  setInterval(tick, 10);
};

mainLoop(gameEntities, [
  new DisplaySystem(),
  new MomentumSystem(),
  new CollisionSystem(),
  new ImpactSystem(),
  new PlayerControlSystem(),
  new FrictionSystem(),
  new ZombieVirus(),
  new ResetCollisions(),
]);
