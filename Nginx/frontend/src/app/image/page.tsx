

'use client'
import React, { useEffect, useRef, useState } from 'react';

const ImageEditor = () => {
  const url = "https://cdn.pixabay.com/photo/2025/03/17/14/43/bird-9476034_640.png";
  const canvasRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

const processImage = () => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;

img.onload = () => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  const fixedWidth = 800;
  const scale = fixedWidth / img.width;
  const scaledHeight = img.height * scale;
  
  canvas.width = fixedWidth;
  canvas.height = scaledHeight;

  // 一度だけグレースケール画像を描画する小さな仮キャンバスを作る
  const tmpCanvas = document.createElement("canvas");
  const tmpCtx = tmpCanvas.getContext("2d");

  tmpCanvas.width = canvas.width / 5;
  tmpCanvas.height = canvas.height / 5;
  tmpCtx.drawImage(img, 0, 0, tmpCanvas.width, tmpCanvas.height);

  const imageData = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    data[i] = data[i + 1] = data[i + 2] = gray;
  }

  tmpCtx.putImageData(imageData, 0, 0);

  // 🎉 createPattern で繰り返し描画！
  const pattern = ctx.createPattern(tmpCanvas, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  setImgLoaded(true);
};
}

  useEffect(() => {
    processImage(); // 最初に一回だけ読み込み
  }, []);

  return (
    <div>
      <h2>画像編集サンプル（グレースケール）</h2>
      <canvas
        ref={canvasRef}
        className="rounded-[20px]"
        style={{
          border: '4px solid',
          borderImage: 'linear-gradient(45deg, #ff0000, #0000ff) 1'
        }}
      />
      {!imgLoaded && <p>画像を読み込み中...</p>}
      <button onClick={processImage}>もういっかいやってみる</button>
    </div>
  );
};

export default ImageEditor;
