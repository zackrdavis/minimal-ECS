import { Entity } from "../ecs";

export class DisplaySystem {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null | undefined;

  constructor() {
    this.canvas = document.querySelector("#ecsCanvas");
    this.context = this.canvas?.getContext("2d");
  }

  update(entities: Entity[]) {
    // do nothing if no canvas
    if (!this.canvas || !this.context) {
      return;
    }

    const ctx = this.context;

    // clear canvas for redraw
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const entity of entities) {
      if (entity.has("style") && entity.has("location")) {
        const { width, height, color } = entity.get("style");
        const { x, y } = entity.get("location");

        // draw and fill the rect
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
      }
    }
  }
}
