export async function load(): Promise<{ imageUrls: string[] }> {
  const imageUrls = [
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
  ];

  return { imageUrls };
}
