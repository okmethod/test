import type { Point } from "$lib/types/matter";

export async function getVertices(imageUrl: string): Promise<Point[]> {
  const imageElement = await loadImage(imageUrl);
  const imageArray = getImageArrayFromElement(imageElement);
  const vertices = getVerticesFromImageArray(imageArray, imageElement.width, imageElement.height);
  const verticesClockwise = sortClockwise(vertices);
  return verticesClockwise;
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

function getImageArrayFromElement(imageElement: HTMLImageElement): Uint8ClampedArray {
  const { width, height } = imageElement;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context could not be obtained");
  ctx.drawImage(imageElement, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  return imageData.data;
}

function getVerticesFromImageArray(imageArray: Uint8ClampedArray, width: number, height: number): Point[] {
  const vertices: Point[] = [];
  const visited = new Set<string>();

  function _isTransparent(x: number, y: number): boolean {
    const index = (y * width + x) * 4;
    return imageArray[index + 3] === 0;
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

function sortClockwise(vertices: Point[]): Point[] {
  const centroid = vertices.reduce(
    (acc, vertex) => {
      acc.x += vertex.x;
      acc.y += vertex.y;
      return acc;
    },
    { x: 0, y: 0 },
  );
  centroid.x /= vertices.length;
  centroid.y /= vertices.length;

  const verticesWithAngles = vertices.map((vertex) => {
    const angle = Math.atan2(vertex.y - centroid.y, vertex.x - centroid.x);
    return { ...vertex, angle };
  });

  verticesWithAngles.sort((a, b) => a.angle - b.angle);
  return verticesWithAngles.map((vertex) => ({ x: vertex.x, y: vertex.y }));
}

export function scaleVertices(vertices: Point[], scale: number): Point[] {
  const centerX = vertices.reduce((sum, v) => sum + v.x, 0) / vertices.length;
  const centerY = vertices.reduce((sum, v) => sum + v.y, 0) / vertices.length;

  return vertices.map((v) => ({
    x: centerX + (v.x - centerX) * scale,
    y: centerY + (v.y - centerY) * scale,
  }));
}

function isConvex(p1: Point, p2: Point, p3: Point) {
  return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x) >= 0;
}

export function convertToConvex(vertices: Point[]): Point[] {
  const convexVertices = vertices.slice();

  for (let i = 0; i < convexVertices.length; i++) {
    const p1 = convexVertices[i];
    const p2 = convexVertices[(i + 1) % convexVertices.length];
    const p3 = convexVertices[(i + 2) % convexVertices.length];

    if (!isConvex(p1, p2, p3)) {
      // 凹型の頂点を削除
      convexVertices.splice((i + 1) % convexVertices.length, 1);
      i = -1; // 再度チェックするためにリセット
    }
  }

  return convexVertices;
}

export function decomposeToConvex(vertices: Point[]): Point[][] {
  const convexPolygons: Point[][] = [];
  const remainingVertices = vertices.slice();

  while (remainingVertices.length > 3) {
    const earIndex = _findEar(remainingVertices);
    if (earIndex === -1) {
      break;
    }

    const p1 = remainingVertices[earIndex];
    const p2 = remainingVertices[(earIndex + 1) % remainingVertices.length];
    const p3 = remainingVertices[(earIndex + 2) % remainingVertices.length];

    convexPolygons.push([p1, p2, p3]);
    remainingVertices.splice((earIndex + 1) % remainingVertices.length, 1);
  }

  convexPolygons.push(remainingVertices);
  return convexPolygons;

  function _findEar(vertices: Point[]): number {
    for (let i = 0; i < vertices.length; i++) {
      const p1 = vertices[i];
      const p2 = vertices[(i + 1) % vertices.length];
      const p3 = vertices[(i + 2) % vertices.length];

      if (isConvex(p1, p2, p3)) {
        let isEar = true;
        for (let j = 0; j < vertices.length; j++) {
          if (j !== i && j !== (i + 1) % vertices.length && j !== (i + 2) % vertices.length) {
            if (_isPointInTriangle(vertices[j], p1, p2, p3)) {
              isEar = false;
              break;
            }
          }
        }
        if (isEar) {
          return (i + 1) % vertices.length;
        }
      }
    }
    return -1;
  }

  function _isPointInTriangle(p: Point, p1: Point, p2: Point, p3: Point): boolean {
    const d1 = _sign(p, p1, p2);
    const d2 = _sign(p, p2, p3);
    const d3 = _sign(p, p3, p1);

    const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
    const hasPos = d1 > 0 || d2 > 0 || d3 > 0;

    return !(hasNeg && hasPos);

    function _sign(p: Point, p1: Point, p2: Point): number {
      return (p.x - p2.x) * (p1.y - p2.y) - (p1.x - p2.x) * (p.y - p2.y);
    }
  }
}
