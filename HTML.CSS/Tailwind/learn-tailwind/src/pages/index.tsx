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
    </div>
  );
}
