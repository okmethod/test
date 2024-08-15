export interface Point {
  x: number;
  y: number;
}

export async function getVerticesFromImage(imageUrl: string): Promise<Point[]> {
  const image = await loadImage(imageUrl);
  const { width, height } = image;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context could not be obtained");
  ctx.drawImage(image, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // 透明部分を除いて残りの部分から頂点を取得
  const vertices: Point[] = [];
  const visited = new Set<string>();

  function _isTransparent(x: number, y: number): boolean {
    const index = (y * width + x) * 4;
    return data[index + 3] === 0;
  }

  function _addVertex(x: number, y: number) {
    const key = `${x},${y}`;
    if (!visited.has(key)) {
      vertices.push({ x, y });
      visited.add(key);
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!_isTransparent(x, y)) {
        if (y === 0 || _isTransparent(x, y - 1)) _addVertex(x, y); // 上
        if (y === height - 1 || _isTransparent(x, y + 1)) _addVertex(x, y); // 下
        if (x === 0 || _isTransparent(x - 1, y)) _addVertex(x, y); // 左
        if (x === width - 1 || _isTransparent(x + 1, y)) _addVertex(x, y); // 右
      }
    }
  }

  return vertices;
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
}
