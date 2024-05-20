import { Entity } from "../types";
import { getEntsWithComps } from "../utils";

let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null | undefined;

export const renderSystem = (allEntities: Entity[]) => {
  if (!canvas || !context) {
    // Find canvas and context.
    canvas = document.querySelector("canvas");
    context = canvas?.getContext("2d");
  } else {
    // Clear the canvas.
    context.clearRect(0, 0, canvas.width, canvas.height);

    const entities = getEntsWithComps(["appearance", "position"], allEntities);

    for (const entity of entities) {
      const { width, height, color, text } = entity.appearance;
      const { x, y } = entity.position;

      // Draw and fill the rect.
      context.fillStyle = color;
      context.fillRect(x, y, width, height);

      // Draw the text.
      if (text) {
        context.font = `${height}px Arial`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#000000";
        context.fillText(text, x + width / 2, y + (height / 2) * 1.1);
      }
    }
  }
};
