<script context="module" lang="ts">
  // UMDグローバルとして読み込んだモジュールと型を宣言
  declare const Matter: typeof import("matter-js");
  declare const decomp: (polygon: number[][]) => number[][][];
  declare global {
    interface Window {
      decomp: (polygon: number[][]) => number[][][];
    }
  }
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { initEngine, initRunner, initBodies, initRender, initMouse } from "./initMatter";
  import { createPointerEventHandlers, type PointerEventHandlersMap } from "./createEventHandlers";

  let renderContainer: HTMLDivElement;
  let engine: Matter.Engine; // eslint-disable-line no-undef
  let runner: Matter.Runner; // eslint-disable-line no-undef
  let render: Matter.Render; // eslint-disable-line no-undef
  let mouseConstraint: Matter.MouseConstraint; // eslint-disable-line no-undef
  let isHolding = false;

  let eventHandlers: PointerEventHandlersMap;

  onMount(async () => {
    engine = initEngine();
    runner = initRunner();
    render = initRender(engine, renderContainer);
    mouseConstraint = initMouse(engine, render);
    const bodies = await initBodies(engine, renderContainer);
    if (browser) {
      window.decomp = decomp;
      Matter.World.add(engine.world, bodies);
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);

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

    <div bind:this={renderContainer} class="w-80 h-80"></div>
  </div>
</div>
