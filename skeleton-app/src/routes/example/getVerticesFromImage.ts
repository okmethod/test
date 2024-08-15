declare const cv: typeof import("opencv-ts");

export interface Point {
  x: number;
  y: number;
}

export async function getVerticesFromImage(imageUrl: string): Promise<Point[]> {
  const image = await loadImage(imageUrl);
  const mat = cv.imread(image);

  // BGRAに変換
  const bgra = new cv.Mat();
  cv.cvtColor(mat, bgra, cv.COLOR_RGBA2BGRA);

  // 透明部分を白、それ以外を黒として二値化
  const binary = new cv.Mat();
  const channels = new cv.MatVector();
  cv.split(bgra, channels);
  const alphaChannel = channels.get(3);
  cv.threshold(alphaChannel, binary, 0, 255, cv.THRESH_BINARY);

  // 輪郭を検出
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(binary, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

  // 最初の輪郭を取得
  const contour = contours.get(0);
  const vertices: Point[] = [];
  for (let i = 0; i < contour.data32S.length; i += 2) {
    vertices.push({ x: contour.data32S[i], y: contour.data32S[i + 1] });
  }

  // メモリを解放
  mat.delete();
  bgra.delete();
  binary.delete();
  contours.delete();
  hierarchy.delete();
  channels.delete();
  alphaChannel.delete();

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
