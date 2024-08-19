export async function load(): Promise<{ imageUrls: string[] }> {
  const imageUrls = [
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/101.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/101.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10232.png",
  ]; // 3分の1の確率でヒスイのすがた

  return { imageUrls };
}
