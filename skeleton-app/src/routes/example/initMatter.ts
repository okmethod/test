declare const Matter: typeof import("matter-js");
import { getVertices } from "$lib/utils/getVertices";

const isDevelopment = (import.meta.env.MODE as string) === "development";

// https://brm.io/matter-js/docs/classes/Engine.html
export function initEngine(): Matter.Engine {
  return Matter.Engine.create({
    enableSleeping: true,
    positionIterations: 6, // 位置の解決の反復回数(default=6)
    velocityIterations: 4, // 速度の解決の反復回数(default=4)
    constraintIterations: 6, // 制約の解決の反復回数(default=2)
  });
}

// https://brm.io/matter-js/docs/classes/Runner.html
export function initRunner(): Matter.Runner {
  return Matter.Runner.create();
}

// https://brm.io/matter-js/docs/classes/Render.html
export function initRender(engine: Matter.Engine, renderContainer: HTMLDivElement): Matter.Render {
  const render = Matter.Render.create({
    element: renderContainer,
    engine: engine,
    options: {
      width: renderContainer.clientWidth,
      height: renderContainer.clientHeight,
      pixelRatio: 1,
      background: "transparent", // ここでは透明にし、style側で指定する
      hasBounds: false,
      wireframes: false,
      showSleeping: false,
    },
  });
  return render;
}

// https://brm.io/matter-js/docs/classes/Mouse.html
// https://brm.io/matter-js/docs/classes/MouseConstraint.html
export function initMouse(engine: Matter.Engine, render: Matter.Render): Matter.MouseConstraint {
  const mouse = Matter.Mouse.create(render.canvas);
  render.mouse = mouse;

  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    // マウスとボディを結ぶバネを召喚する
    constraint: {
      stiffness: 0.2, // 剛性
      damping: 0, // 減衰
      length: 0,
      render: {
        visible: isDevelopment ? true : false,
        lineWidth: 2,
        strokeStyle: "#00ff00",
      },
    },
  });
  return mouseConstraint;
}

// https://brm.io/matter-js/docs/classes/Bodies.html
// args: (x, y, width, height, options)
export async function initBodies(renderContainer: HTMLDivElement): Promise<Matter.Body[]> {
  const width = renderContainer.clientWidth;
  const height = renderContainer.clientHeight;

  // 壁の作成
  function _createWallConfig(width: number, height: number, thickness: number, overlap: number) {
    return [
      { x: width / 2 - overlap, y: -thickness / 2, w: width + overlap * 2, h: thickness }, // 上辺
      { x: width / 2 - overlap, y: height + thickness / 2, w: width + overlap * 2, h: thickness }, // 下辺
      { x: -thickness / 2, y: height / 2 - overlap, w: thickness, h: height + overlap * 2 }, // 左辺
      { x: width + thickness / 2, y: height / 2 - overlap, w: thickness, h: height + overlap * 2 }, // 右辺
    ];
  }
  const walls = _createWallConfig(width, height, 2000, 0).map((config) =>
    Matter.Bodies.rectangle(config.x, config.y, config.w, config.h, {
      isStatic: true,
      render: {
        visible: false,
      },
    }),
  );

  const imageUrls = [
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  ];

  // don't use poly-decomp
  const scale = 1;
  const fromVertices = await Promise.all(
    imageUrls.map(async (imageUrl, index) => {
      const vertices = await getVertices(imageUrl, scale * 0.9);
      return Matter.Bodies.fromVertices(120 + index * 40, 20, [vertices], {
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
    }),
  );

  return [...walls, ...fromVertices];
}
