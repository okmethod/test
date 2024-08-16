export interface StaticItemData {
  name: string;
  imageUrl: string;
}

export interface StaticPokeData extends StaticItemData {
  height: number;
  weight: number;
}
