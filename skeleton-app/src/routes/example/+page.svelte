<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { initEngine, initRunner, initBodies, initRender, initMouse } from "./initMatter";

  let renderContainer: HTMLDivElement;
  let engine: Matter.Engine;
  let runner: Matter.Runner;
  let render: Matter.Render;
  onMount(() => {
    engine = initEngine();
    runner = initRunner();
    render = initRender(engine, renderContainer);
    const mouseConstraint = initMouse(engine, render);
    const bodies = initBodies(renderContainer);
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

    <div bind:this={renderContainer} class="w-80 h-80"></div>
  </div>
</div>
