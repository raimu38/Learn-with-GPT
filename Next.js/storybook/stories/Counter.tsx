import React, { useState } from 'react';

// 見た目のための簡単なスタイル
const style: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '1.2rem',
  cursor: 'pointer',
  borderRadius: '8px',
  border: '1px solid #ccc',
  backgroundColor: '#f0f0f0',
};

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <button style={style} onClick={() => setCount(count + 1)}>
      今の数字は: {count}
    </button>
  );
};
