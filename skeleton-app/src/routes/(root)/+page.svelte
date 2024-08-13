<script lang="ts">
  import { navigateTo } from "$lib/utils/navigation.client";
  import { GITHUB_REPO_URL } from "$lib/constants/common";
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">Hello, Welcome to My Static Site !</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle !ml-4">
    <button on:click|preventDefault={() => navigateTo("/example")} class="cLinkButtonStyle md:!text-2xl">
      次のページ
    </button>
    <button
      on:click|preventDefault={() => window.open(GITHUB_REPO_URL, "_blank")}
      class="cLinkButtonStyle md:!text-2xl"
    >
      リポジトリ
    </button>
  </div>
</div>
