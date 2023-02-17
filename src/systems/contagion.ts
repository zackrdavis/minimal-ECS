import { processEntitiesWith, COMP } from "./shared";

export class ContagionSystem {
  canvas: HTMLCanvasElement | null;

  constructor() {
    this.canvas = document.querySelector("#ecsCanvas");

    this.canvas?.addEventListener("collision", (e: any) => {
      const { ent1, ent2 } = e.detail;

      processEntitiesWith(
        [COMP.STYLE, COMP.VELOCITY, COMP.CONTAGION],
        [ent1, ent2],
        (entity1, others) => {
          const entity2 = others[0];

          // skip if entity2 not contagious
          if (!entity2) return;

          const { x: x1, y: y1 } = entity1.get("velocity");
          const { x: x2, y: y2 } = entity2.get(COMP.VELOCITY);
          const speed1 = Math.sqrt(x1 ** 2 + y1 ** 2);
          const speed2 = Math.sqrt(x2 ** 2 + y2 ** 2);

          if (speed1 > speed2) {
            const oldStyle = entity2.get("style");
            oldStyle.color = entity1.get("style").color;
            entity2.set(oldStyle);
          }
        }
      );
    });
  }

  update() {}
}
