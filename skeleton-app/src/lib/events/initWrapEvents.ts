declare const Matter: typeof import("matter-js");

function createWrapEvents(engine: Matter.Engine, renderContainer: HTMLDivElement) {
  // ワールドの境界を設定
  engine.world.bounds = {
    min: { x: 0, y: 0 },
    max: { x: renderContainer.clientWidth, y: renderContainer.clientHeight },
  };

  const bodies = Matter.Composite.allBodies(engine.world);
  bodies.forEach(function (body) {
    if (body.position.x < 0) {
      Matter.Body.setPosition(body, { x: engine.world.bounds.max.x, y: body.position.y });
    } else if (body.position.x > engine.world.bounds.max.x) {
      Matter.Body.setPosition(body, { x: 0, y: body.position.y });
    }
    if (body.position.y < 0) {
      Matter.Body.setPosition(body, { x: body.position.x, y: engine.world.bounds.max.y });
    } else if (body.position.y > engine.world.bounds.max.y) {
      Matter.Body.setPosition(body, { x: body.position.x, y: 0 });
    }
  });
}

export function initWrapEvents(engine: Matter.Engine, renderContainer: HTMLDivElement) {
  const wrapEvents = () => createWrapEvents(engine, renderContainer);
  Matter.Events.on(engine, "beforeUpdate", wrapEvents);

  return () => {
    Matter.Events.off(engine, "beforeUpdate", wrapEvents);
  };
}
