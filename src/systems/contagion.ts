import { forEntsWith } from "./shared";

export class ZombieVirus {
  canvas: HTMLCanvasElement | null;

  constructor() {
    this.canvas = document.querySelector("#ecsCanvas");

    this.canvas?.addEventListener("collision", (e: any) => {
      const { ent1, ent2 } = e.detail;

      forEntsWith(["style", "velocity"], [ent1, ent2], (entity1, others) => {
        const entity2 = others[0];

        if (ent1.zombieVirus && ent1.velocity && ent2.velocity) {
          const { x: x1, y: y1 } = entity1.velocity;
          const { x: x2, y: y2 } = entity2.velocity;
          const speed1 = Math.sqrt(x1 ** 2 + y1 ** 2);
          const speed2 = Math.sqrt(x2 ** 2 + y2 ** 2);

          if (speed1 > speed2) {
            entity2.style.color = "green";
          }
        }
      });
    });
  }

  update() {}
}
