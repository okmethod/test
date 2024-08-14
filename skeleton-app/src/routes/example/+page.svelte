<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  // import Matter from "matter-js"; 外部モジュールとして読み込んでいるので、ここではインポートしない

  function initBodies(): Matter.Body[] {
    // https://brm.io/matter-js/docs/classes/Bodies.html
    // args: (x, y, width, height, options)
    const boxA = Matter.Bodies.rectangle(150, 50, 40, 40);
    const boxB = Matter.Bodies.rectangle(180, 100, 40, 40);
    const ground = Matter.Bodies.rectangle(150, 300, 200, 60, { isStatic: true });

    return [boxA, boxB, ground];
  }

  let renderContainer: HTMLDivElement;
  function initRender(engine: Matter.Engine, renderContainer: HTMLDivElement): Matter.Render {
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

  function initMouse(engine: Matter.Engine, render: Matter.Render): Matter.MouseConstraint {
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

  let engine: Matter.Engine;
  let runner: Matter.Runner;
  let render: Matter.Render;
  onMount(() => {
    // https://brm.io/matter-js/docs/classes/Engine.html
    engine = Matter.Engine.create();
    // https://brm.io/matter-js/docs/classes/Runner.html
    runner = Matter.Runner.create();

    const bodies = initBodies();

    render = initRender(engine, renderContainer);
    const mouseConstraint = initMouse(engine, render);
    if (browser) {
      Matter.World.add(engine.world, bodies);
      Matter.World.add(engine.world, mouseConstraint);
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);
    }
  });

  onDestroy(() => {
    if (browser) {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    }
  });
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">Example route</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle !ml-4">
    <span>matter-js renderContainer</span>

    <div bind:this={renderContainer}></div>
  </div>
</div>
