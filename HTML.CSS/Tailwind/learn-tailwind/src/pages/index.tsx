import { UUID } from "crypto";
import { useEffect, useState } from "react";

export default function Hello() {
  return (
    <div>
      <div className="p-6">
        <h1 className="text-3xl text-green-600 font-bold ">見出し</h1>
        <p className="mt-4 text-gray-400">これは段落です。Tailwind CSSを使用してスタイリングしています。</p>
        <p className="mt-4 text-amber-400 ">野原い花が咲きました。花咲く。何が咲いたでしょーか？</p>
      </div>
      <p>Hello Taiwind</p>
      <div className="bg-white dark:bg-gray-800 rounded-lg px-10 py-8 ring shadow-rose-800 shadow-lg ring-red-500/10">
        {" "}
        {/* /20は透明度 5の倍数を設定 20=20% */}
        <div>
          <span className="inline-flex items-center justify-center rounded-md bg-indigo-500 1-2 shadow-md">
            <svg className="h-6 w-6 stroke-white"></svg>
          </span>
        </div>
        <h3 className="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
          The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer
          space.
        </p>
      </div>
      <div className="bg-sky-400 mt-5 dark:bg-yellow-600 px-10 py-10 justify-center rounded-2xl shadow-md shadow-zinc-500 ">
        <div></div>
      </div>
      <Goodnight message="らいむくん" age={21} />
      <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800">
        <span className="inline-flex shrink-0 rounded-full border border-pink-300 bg-pink-100 p-2 dark:border-pink-300/10 dark:bg-pink-400/10">
          <svg className="size-6 stroke-pink-700 dark:stroke-pink-500"></svg>
        </span>
        <div>
          <p className="text-gray-700 dark:text-gray-400">
            <span className="font-medium text-gray-950 dark:text-white">Tom Watson</span> mentioned you in
            <span className="font-medium text-gray-950 dark:text-white">Logo redesign</span>
          </p>
          <time className="mt-1 block text-gray-500">9:37am</time>
        </div>
      </div>
      <div className="bg-sky-500/50">
        <div className="w-10 h-10  block"></div>
      </div>
      <div className="bg-sky-500/50 flex">
        <div className="w-10 h-10"></div>
      </div>
      <div>
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
}

interface GoodnightProps {
  message?: string;
  age?: number;
}

export function Goodnight({ message, age = 9 }: GoodnightProps) {
  const [width, setWidth] = useState(0); // 初期値を 0 に設定

  const [isExpanding, setIsExpanding] = useState(true); // 伸びるか縮むかを制御

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prev) => {
        if (isExpanding && prev >= 300) {
          setIsExpanding(false); // 上限に達したら縮む方向に変更
          return prev - 5;
        } else if (!isExpanding && prev <= 0) {
          setIsExpanding(true); // 下限に達したら伸びる方向に変更
          return prev + 5;
        }

        return isExpanding ? prev + 5 : prev - 5; // 状態に応じて増減
      });
    }, 7);

    // クリーンアップ関数
    return () => clearInterval(interval);
  }, [isExpanding]); // `isExpanding` を依存配列に追加

  return (
    <>
      <div className="bg-sky-100" style={{ width: `${width}px`, height: "50px", transition: "width 0.1s linear" }}>
        <p>ブロック</p>
      </div>
      <h1 className="font-bold text-xl text-pink-600">さようなら</h1>
      <p>ここに{message}を入れてね</p>
      <p>私は{age}歳です</p>
    </>
  );
}
