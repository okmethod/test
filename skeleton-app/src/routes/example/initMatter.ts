declare const Matter: typeof import("matter-js");

export function initRender(engine: Matter.Engine, renderContainer: HTMLDivElement): Matter.Render {
  // https://brm.io/matter-js/docs/classes/Render.html
  const render = Matter.Render.create({
    element: renderContainer,
    engine: engine,
    options: {
      width: 300,
      height: 400,
      pixelRatio: 1,
      background: "#888888",
      hasBounds: false,
      wireframes: false,
    },
  });
  return render;
}

export function initMouse(engine: Matter.Engine, render: Matter.Render): Matter.MouseConstraint {
  // https://brm.io/matter-js/docs/classes/Mouse.html
  const mouse = Matter.Mouse.create(render.canvas);
  render.mouse = mouse;

  // https://brm.io/matter-js/docs/classes/MouseConstraint.html
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    // マウスとボディを結ぶバネを召喚する
    constraint: {
      stiffness: 0.2, // 剛性
      damping: 0, // 減衰
      length: 0,
      render: {
        visible: true,
        lineWidth: 2,
        strokeStyle: "#00ff00",
      },
    },
  });
  return mouseConstraint;
}

export function initBodies(): Matter.Body[] {
  // https://brm.io/matter-js/docs/classes/Bodies.html
  // args: (x, y, width, height, options)
  const boxA = Matter.Bodies.rectangle(150, 50, 40, 40);
  const boxB = Matter.Bodies.rectangle(180, 100, 40, 40);
  const ground = Matter.Bodies.rectangle(150, 300, 200, 60, { isStatic: true });

  return [boxA, boxB, ground];
}
