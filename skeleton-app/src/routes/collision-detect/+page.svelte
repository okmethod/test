<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import Icon from "@iconify/svelte";
  import { initMatterBase, runMatterBase, cleanupMatterBase, type MatterBase } from "$lib/initializers/initMatterBase";
  import { initEventHandlers } from "$lib/initializers/initEventHandlers";
  import { createSpriteBody } from "$lib/utils/createBody";
  import { getRandomNumber } from "$lib/utils/numerics";
  import type { bodyTemplate } from "./+page";

  export let data: {
    bodyTemplates: bodyTemplate[];
  };

  const bodyTemplates = data.bodyTemplates;

  let renderContainer: HTMLDivElement;
  let matterBase: MatterBase;
  let removeEventHandlers: () => void;
  let isHolding = false;
  onMount(() => {
    matterBase = initMatterBase(renderContainer);

    // 衝突検知イベントの追加
    Matter.Events.on(matterBase.engine, "collisionStart", function (event) {
      const pairs = event.pairs;

      pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;

        if (bodyA.collisionFilter.category === 0b1 || bodyB.collisionFilter.category === 0b1) {
          //console.debug("Collision detected with wall");
          return;
        }
        console.debug(
          "Collision detected:",
          `0b${bodyA.collisionFilter.category?.toString(2).padStart(6, "0")}`,
          `0b${bodyB.collisionFilter.category?.toString(2).padStart(6, "0")}`,
        );
        // 同じカテゴリのもの同士が衝突した場合は削除する
        if (bodyA.collisionFilter.category === bodyB.collisionFilter.category) {
          Matter.Composite.remove(matterBase.engine.world, bodyA);
          Matter.Composite.remove(matterBase.engine.world, bodyB);
        }
      });
    });

    if (browser) {
      runMatterBase(matterBase);
      removeEventHandlers = initEventHandlers(matterBase.engine.world, matterBase.mouseConstraint, renderContainer, {
        isHolding,
      });
    }
  });

  onDestroy(() => {
    if (browser) {
      cleanupMatterBase(matterBase);
      if (removeEventHandlers) {
        removeEventHandlers();
      }
    }
  });

  // Create Body
  let spawnPokeIndex;
  async function spawnPokeBody(): Promise<void> {
    spawnPokeIndex = getRandomNumber(bodyTemplates.length);
    const spawnPosX = getRandomNumber(100);
    await _spawnSpriteBody(bodyTemplates[spawnPokeIndex]);

    async function _spawnSpriteBody(bodyTemplate: bodyTemplate): Promise<void> {
      const body = await createSpriteBody(bodyTemplate.imageUrl, 1, { x: 50 + spawnPosX * 2, y: 20 });
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
