import { navigateTo } from "$lib/utils/navigation.client";
import { fetchBall } from "$lib/constants/fetchStaticData";
import { GITHUB_REPO_URL } from "$lib/constants/common";

interface Content {
  title: string;
  ballId: string;
  action: "navigate" | "redirect";
  route: string;
}

export interface ContentButtonProps {
  title: string;
  imageUrl: string;
  alt: string;
  onClick: () => void;
}

const contents: Content[] = [
  {
    title: "ポケモン詰め放題",
    ballId: "4",
    action: "navigate",
    route: "/hodai",
  },
  {
    title: "ソースコード",
    ballId: "12",
    action: "redirect",
    route: GITHUB_REPO_URL,
  },
];

export async function load() {
  const ballData = await Promise.all(contents.map((content) => fetchBall(content.ballId)));
  const propsArray: ContentButtonProps[] = contents.map((content, index) => ({
    title: content.title,
    imageUrl: ballData[index]?.imageUrl ?? "not_found",
    alt: ballData[index]?.name ?? "not_found",
    onClick: _getOnClick(content.action, content.route),
  }));

  function _getOnClick(action: string, route: string): () => void {
    const actions: { [key: string]: () => void } = {
      navigate: () => navigateTo(route),
      redirect: () => window.open(route, "_blank"),
    };
    return actions[action] || (() => {});
  }

  return { propsArray };
}
