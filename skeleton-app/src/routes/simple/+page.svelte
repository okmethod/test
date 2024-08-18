<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import Icon from "@iconify/svelte";
  import { initMatter, type MatterObjects } from "$lib/utils/initMatter";
  import { initEventHandlers } from "$lib/utils/initEventHandlers";
  import { createPokeBody } from "$lib/utils/createPokeBody";
  import { getRandomNumber } from "$lib/utils/numerics";

  export let data: {
    imageUrls: string[];
  };

  const imageUrls = data.imageUrls;

  let renderContainer: HTMLDivElement;
  let matter: MatterObjects;
  let removeEventHandlers: () => void;
  let isHolding = false;
  onMount(() => {
    matter = initMatter(renderContainer);

    if (browser) {
      Matter.Composite.add(matter.engine.world, matter.walls);
      Matter.Runner.run(matter.runner, matter.engine);
      Matter.Render.run(matter.render);

      removeEventHandlers = initEventHandlers(matter.engine.world, matter.mouseConstraint, renderContainer, {
        isHolding,
      });
    }
  });

  onDestroy(() => {
    if (browser) {
      Matter.Render.stop(matter.render);
      Matter.Runner.stop(matter.runner);
      Matter.World.clear(matter.engine.world, false);
      Matter.Engine.clear(matter.engine);

      if (removeEventHandlers) {
        removeEventHandlers();
      }
    }
  });

  // Create Body
  let spawnPokeIndex;
  async function spawnPokeBody(): Promise<void> {
    spawnPokeIndex = getRandomNumber(imageUrls.length);
    const spawnPosX = getRandomNumber(100);
    const body = await createPokeBody(imageUrls[spawnPokeIndex], 1, { x: 50 + spawnPosX * 2, y: 20 });
    Matter.Composite.add(matter.engine.world, [body]);
  }
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-2">
    <h1 class="cTitleStyle md:!text-3xl">simple</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle !mt-1 !ml-4 !mr-4">
    <!-- 入力フォーム -->
    <div class="flex items-center justify-center">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">Create Body</span>
        <form on:submit|preventDefault={spawnPokeBody}>
          <button type="submit" class="cIconButtonStyle">
            <div class="cIconDivStyle">
              <Icon icon="mdi:pokeball" class="cIconStyle" />
            </div>
          </button>
        </form>
      </div>
    </div>

    <!-- Render -->
    <div class="m-4">
      <div bind:this={renderContainer} class="w-80 h-80 bg-gray-300 border border-black"></div>
    </div>
  </div>
</div>
