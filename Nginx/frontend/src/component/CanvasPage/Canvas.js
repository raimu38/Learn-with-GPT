'use client'
import { useEffect, useRef } from "react";

const CanvasComponent = () => {
  const width = 800;
  const height = 600;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "green"
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "red"
    ctx.fillRect(100,100, 200, 300);

// 白い縦線だけ
ctx.beginPath();
ctx.moveTo(width/4, height/4);
ctx.lineTo(width/4, height/4*3);
ctx.strokeStyle = "white";
ctx.stroke();

// 青い三角形（赤い縁取り）
ctx.beginPath();
ctx.moveTo(width/4, height/4*3);
ctx.lineTo(width/4*3, height/4*3);
ctx.lineTo(width/4*2, height/4);
ctx.closePath();
ctx.fillStyle = "blue";
ctx.strokeStyle = "red";
ctx.fill();
ctx.stroke();
    
const grad = ctx.createLinearGradient(100,0,900,0);
grad.addColorStop(0, "red");
grad.addColorStop(1, "blue");
ctx.fillStyle = grad;

ctx.shadowColor = "rgba(190,0,200,0.9)";
ctx.shadowBlur = 1;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.fillRect(300,100, 400,400)

ctx.save(); // ← 元の状態を保存

ctx.translate(100, 100); // まず位置をずらす（基準点をずらす）
ctx.rotate(Math.PI * 7/ 4); // 45度回転（ラジアン単位）
ctx.scale(1, 3);         // 横2倍・縦そのまま

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 100, 100); // ← この四角が「変身」する！

ctx.restore(); // ← 状態を戻す（元の状態にリセット）
  }, []);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "my-canvas.png";
    link.click();
  };

  return (
    <div className="bg-blue-500 h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-white text-xl">Canvas here!</p>
      <canvas
        id="myCanvas"
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-black"
      />
      <button
        onClick={downloadImage}
        className="px-4 py-2 bg-white text-blue-500 font-bold rounded shadow hover:bg-gray-200"
      >
        ダウンロードする
      </button>
    </div>
  );
};

export default CanvasComponent;
