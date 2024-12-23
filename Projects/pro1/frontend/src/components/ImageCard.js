import React from "react";

export default function ImageCard({ imageId, title }) {
  // バイナリデータを直接返すエンドポイント: /api/image/:image_id
  // そのまま img タグの src に指定は難しいので、Base64 変換などが必要。
  // ここでは仮に <img src={"/api/image/" + imageId} /> で済ませるか、
  // axios でバイナリ取得 -> Blob URL 変換などの手段があります。

  return (
    <div className="border p-2 rounded">
      <p>{title}</p>
      <img src={`/api/image/${imageId}`} alt={title} className="max-w-full h-auto" />
    </div>
  );
}
