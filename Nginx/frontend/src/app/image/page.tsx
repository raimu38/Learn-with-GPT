

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

    // ✅ キャンバスサイズを固定
const fixedWidth = 800;
const scale = fixedWidth / img.width;
const scaledHeight = img.height * scale;

canvas.width = fixedWidth;
canvas.height = scaledHeight;

    // ✅ キャンバスのサイズに合わせて画像をリサイズして描画
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      const gray = 0.299 * red + 0.587 * green + 0.114 * blue;
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
      //data[i + 3] = Math.random() * 255;
    }

    ctx.putImageData(imageData, 0, 0);
    setImgLoaded(true);
  };
};

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
