export interface bodyTemplate {
  imageUrl: string;
  category: number;
}

export async function load(): Promise<{ bodyTemplates: bodyTemplate[] }> {
  const bodyTemplates: bodyTemplate[] = [
    {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      category: 0b0000010, // カテゴリ2
    },
    {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      category: 0b0000100, // カテゴリ3
    },
    {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
      category: 0b0001000, // カテゴリ4
    },
    {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      category: 0b0010000, // カテゴリ5
    },
    {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
      category: 0b0100000, // カテゴリ6
    },
  ];

  return { bodyTemplates };
}
