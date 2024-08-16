declare const Matter: typeof import("matter-js");
import { getVertices } from "$lib/utils/getVertices";

export async function createPokeBody(imageUrl: string): Promise<Matter.Body> {
  const scale = 1;
  const vertices = await getVertices(imageUrl, scale * 0.9);
  // don't use poly-decomp
  return Matter.Bodies.fromVertices(120, 20, [vertices], {
    restitution: 0.2, // 反発係数
    friction: 0.1, // 摩擦係数
    density: 0.001, // 密度
    // mass:  // 質量は密度と面積から自動計算される
    render: {
      sprite: {
        texture: imageUrl,
        xScale: scale,
        yScale: scale,
      },
    },
  });
}
