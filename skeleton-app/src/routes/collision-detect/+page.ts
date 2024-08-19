export interface bodyTemplate {
  imageUrl: string;
  category: number;
}

export async function load(): Promise<{ bodyTemplates: bodyTemplate[] }> {
  const imageUrlTemplate = (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  // prettier-ignore
  const symbolPokeIds = [
    1, 4, 7,
    152, 155, 158,
    252, 255, 258,
    387, 390, 393,
    495, 498, 501,
    650, 653, 656,
    722, 725, 728,
    810, 813, 816,
    906, 909, 912,
    25, 133, 1024,
  ];

  const bodyTemplates = symbolPokeIds.map((pokeId, index) => ({
    imageUrl: imageUrlTemplate(pokeId),
    category: 1 << (index + 2), // カテゴリ2 以降を使う
  }));

  return { bodyTemplates };
}
