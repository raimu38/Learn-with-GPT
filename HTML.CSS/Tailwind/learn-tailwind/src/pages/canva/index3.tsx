// import { useRef, useState } from "react";

import { useCallback, useState } from "react";

// const Counter = () => {
//   const countRef = useRef(0); // 再レンダリングしても値を保持
//   const [stateCount, setStateCount] = useState(0);

//   const handleClick = () => {
//     countRef.current += 1; // ref の値は更新されるが、再レンダリングされない
//     console.log("countRef:", countRef.current);
//   };

//   return (
//     <div>
//       <p>State Count: {stateCount}</p>
//       <button onClick={() => setStateCount(stateCount + 1)}>State 更新</button>

//       <p>Ref Count: {countRef.current}</p>
//       <button onClick={handleClick}>Ref 更新</button>
//     </div>
//   );
// };

// export default Counter;

// import { useCallback, useEffect, useRef, useState } from "react";

// const PreviousValue = () => {
//   const [count, setCount] = useState(0);
//   const prevCountRef = useRef<number | null>(null);

//   useEffect(() => {
//     prevCountRef.current = count; // 前回の値を保存
//   }, [count]);

//   return (
//     <div>
//       <p>現在のカウント: {count}</p>
//       <p>前回のカウント: {prevCountRef.current ?? "なし"}</p>
//       <button onClick={() => setCount(count + 1)}>増やす</button>
//     </div>
//   );
// };

type Props = {
  initialCount: number;
};

const Counter = ({ initialCount }: Props) => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Count : {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};
export default Counter;

function createCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const counter = createCounter();
counter();
counter();
