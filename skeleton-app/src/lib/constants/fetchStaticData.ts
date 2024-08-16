import type { StaticPokeData, StaticItemData } from "$lib/types/poke";

export async function fetchPokeData(key: string): Promise<StaticPokeData> {
  const { STATIC_POKE_DICT } = await import("$lib/constants/staticPokeData");
  return STATIC_POKE_DICT[key];
}

export async function fetchBall(key: string): Promise<StaticItemData> {
  const { STATIC_BALL_DICT } = await import("$lib/constants/staticItemData");
  return STATIC_BALL_DICT[key];
}
