declare const Matter: typeof import("matter-js");
import { getVerticesClockwise } from "$lib/utils/getVertices";

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
      background: "#888888",
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
export async function initBodies(engine: Matter.Engine, renderContainer: HTMLDivElement): Promise<Matter.Body[]> {
  const width = renderContainer.clientWidth;
  const height = renderContainer.clientHeight;

  // 壁の作成
  const wallThickness = 2000;
  const walls = [
    Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
    Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, {
      isStatic: true,
    }),
    Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
    Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, {
      isStatic: true,
    }),
  ];

  const imageUrls = [
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  ];

  const fromVertices = await Promise.all(
    imageUrls.map(async (imageUrl, index) => {
      const vertices = await getVerticesClockwise(imageUrl);
      const mainBody = Matter.Bodies.fromVertices(120 + index * 40, 20, [vertices], {
        render: {
          fillStyle: "#ffffff",
          strokeStyle: "#000000",
          lineWidth: 1,
        },
      });

      const ghostBody = Matter.Bodies.rectangle(120 + index * 40, 20, width, height, {
        render: {
          sprite: {
            texture: imageUrl,
            xScale: 1,
            yScale: 1,
          },
          visible: true,
        },
        collisionFilter: {
          group: -1, // 衝突グループを設定して他のボディと衝突しないようにする
          category: 0x0001, // カテゴリを設定
          mask: 0x0000, // マスクを設定して衝突を無効にする
        },
      });

      // メインボディの位置と回転を当たり判定のないボディに連動させる
      Matter.Events.on(engine, "beforeUpdate", () => {
        const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

        const lerpAmount = 0.9; // 補間の量（0.0〜1.0）

        ghostBody.position.x = lerp(ghostBody.position.x, mainBody.position.x, lerpAmount);
        ghostBody.position.y = lerp(ghostBody.position.y, mainBody.position.y, lerpAmount);
        ghostBody.angle = lerp(ghostBody.angle, mainBody.angle, lerpAmount);
      });

      return [mainBody, ghostBody];
    }),
  );

  return [...walls, ...fromVertices.flat()];
}
