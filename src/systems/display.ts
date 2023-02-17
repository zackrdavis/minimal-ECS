import { Ent, forEntsWith } from "./shared";

export class DisplaySystem {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null | undefined;

  constructor() {
    this.canvas = document.querySelector("#ecsCanvas");
    this.context = this.canvas?.getContext("2d");
  }

  update(entities: Ent[]) {
    // do nothing if no canvas
    if (!this.canvas || !this.context) {
      return;
    }

    const ctx = this.context;

    // clear canvas for redraw
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    forEntsWith(["style", "location"], entities, (ent) => {
      const { width, height, color } = ent.style;
      const { x, y } = ent.location;

      // draw and fill the rect
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    });
  }
}
