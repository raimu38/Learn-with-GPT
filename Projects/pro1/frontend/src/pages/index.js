import { useEffect, useState } from "react";

export default function Home() {
  const [imageIds, setImageIds] = useState([]);

  useEffect(() => {
    // 画像一覧をRedisで管理していない場合は、実際には別のエンドポイントを設けるなど必要
    // 今回はアップロードしたIDを別途取得する方法が無いのでダミー、または実装追加が要る
    // 例: /api/list で ID一覧を取得するなど
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image List</h1>
      <p>ここに画像一覧を表示したり、upload ページへのリンクを作ったりする</p>
    </div>
  );
}
