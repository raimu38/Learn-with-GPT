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
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, width, height);
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
