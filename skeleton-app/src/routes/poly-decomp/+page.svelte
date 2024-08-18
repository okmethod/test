<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");

  // UMDグローバルとして読み込んでいる場合は decomp を宣言
  if (typeof decomp !== "undefined") {
    console.log("decomp is loaded");
    declare const decomp: (polygon: number[][]) => number[][][];
    declare global {
      interface Window {
        decomp: (polygon: number[][]) => number[][][];
      }
    }
  }
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import Icon from "@iconify/svelte";
  import { initMatterBase, runMatterBase, cleanupMatterBase, type MatterBase } from "$lib/initializers/initMatterBase";
  import { initEventHandlers } from "$lib/initializers/initEventHandlers";
  import { createDecompBody } from "$lib/utils/createBody";
  import { getRandomNumber } from "$lib/utils/numerics";

  export let data: {
    imageUrls: string[];
  };

  const imageUrls = data.imageUrls;

  let renderContainer: HTMLDivElement;
  let matterBase: MatterBase;
  let removeEventHandlers: () => void;
  let isHolding = false;
  onMount(() => {
    matterBase = initMatterBase(renderContainer);
    if (browser) {
      // poly-decomp を Matter に設定
      if (typeof decomp !== "undefined") Matter.Common.setDecomp(decomp);

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
    spawnPokeIndex = getRandomNumber(imageUrls.length);
    const spawnPosX = getRandomNumber(100);
    const body = await createDecompBody(imageUrls[spawnPokeIndex], 1, { x: 50 + spawnPosX * 2, y: 20 });
    Matter.Composite.add(matterBase.engine.world, [body]);
  }
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-2">
    <h1 class="cTitleStyle md:!text-3xl">poly-decomp</h1>
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
