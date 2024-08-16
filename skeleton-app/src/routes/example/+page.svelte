<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { initEngine, initRunner, initRender, initMouse, initWalls } from "$lib/utils/initMatter";
  import { createPointerEventHandlers, type PointerEventHandlersMap } from "$lib/utils/createEventHandlers";
  import { createPokeBody } from "$lib/utils/createPokeBody";

  const imageUrls = [
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  ];

  let renderContainer: HTMLDivElement;
  let engine: Matter.Engine; // eslint-disable-line no-undef
  let runner: Matter.Runner; // eslint-disable-line no-undef
  let render: Matter.Render; // eslint-disable-line no-undef
  let mouseConstraint: Matter.MouseConstraint; // eslint-disable-line no-undef
  let eventHandlers: PointerEventHandlersMap;
  let isHolding = false;
  onMount(async () => {
    engine = initEngine();
    runner = initRunner();
    render = initRender(engine, renderContainer);
    mouseConstraint = initMouse(engine, render);
    const walls = await initWalls(renderContainer);
    if (browser) {
      Matter.World.add(engine.world, walls);
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);

      const bodies = await Promise.all(imageUrls.map((url) => createPokeBody(url)));
      Matter.World.add(engine.world, bodies);

      let eventHandlers = createPointerEventHandlers(engine.world, mouseConstraint, renderContainer, { isHolding });
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        renderContainer.addEventListener(event, handler);
      });
    }
  });

  onDestroy(() => {
    if (browser) {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);

      Object.entries(eventHandlers).forEach(([event, handler]) => {
        renderContainer.removeEventListener(event, handler);
      });
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

    <div bind:this={renderContainer} class="w-80 h-80 bg-gray-300 border border-black"></div>
  </div>
</div>
