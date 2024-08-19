<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import Icon from "@iconify/svelte";
  import type { Point } from "$lib/types/matter";
  import { initMatterBase, runMatterBase, cleanupMatterBase, type MatterBase } from "$lib/initializers/initMatterBase";
  import { initPointerEvents } from "$lib/events/initPointerEvents";
  import { initCollisionEvents } from "$lib/events/initCollisionEvents";
  import { createSpriteBody } from "$lib/utils/createBody";
  import { getRandomNumber } from "$lib/utils/numerics";
  import type { bodyTemplate } from "./+page";

  export let data: {
    bodyTemplates: bodyTemplate[];
  };

  const bodyTemplates = data.bodyTemplates;

  let renderContainer: HTMLDivElement;
  let matterBase: MatterBase;
  let isHolding = false;
  let removePointerEvents: () => void;
  let removeCollisionEvents: () => void;
  onMount(() => {
    matterBase = initMatterBase(renderContainer);

    if (browser) {
      runMatterBase(matterBase);
      removePointerEvents = initPointerEvents(matterBase.engine.world, matterBase.mouseConstraint, renderContainer, {
        isHolding,
      });
      removeCollisionEvents = initCollisionEvents(matterBase.engine);
    }
  });

  onDestroy(() => {
    if (browser) {
      cleanupMatterBase(matterBase);
      if (removePointerEvents) {
        removePointerEvents();
      }
      if (removeCollisionEvents) {
        removeCollisionEvents();
      }
    }
  });

  // Create Body
  async function spawnPokeBodies(): Promise<void> {
    const totalBodies = bodyTemplates.length * 2;

    const pokeBodyPromises = Promise.all(
      Array.from({ length: totalBodies }, async (_, i) => {
        const spawnPokeIndex = i % bodyTemplates.length;
        const spawnPosX = getRandomNumber(100); // 出現直後に消えないようにランダム化する
        await _spawnSpriteBody(bodyTemplates[spawnPokeIndex], { x: spawnPosX * 3, y: 20 });
      }),
    );
    await pokeBodyPromises;

    async function _spawnSpriteBody(bodyTemplate: bodyTemplate, spawnPoint: Point): Promise<void> {
      const body = await createSpriteBody(bodyTemplate.imageUrl, 1.5, spawnPoint);
      body.collisionFilter.category = bodyTemplate.category;
      console.debug(body.collisionFilter);
      Matter.Composite.add(matterBase.engine.world, [body]);
    }
  }
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-2">
    <h1 class="cTitleStyle md:!text-3xl">collision-detect</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle !mt-1 !ml-4 !mr-4">
    <!-- 入力フォーム -->
    <div class="flex items-center justify-center">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">Create Body</span>
        <form on:submit|preventDefault={spawnPokeBodies}>
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
