// ReactのuseContextを使ってテーマ（ダークモード/ライトモード）を管理するコンテキスト

import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Contextの作成
const ThemeContext = createContext<{ theme: string; toggleTheme: () => void } | undefined>(undefined);

// 2. Providerの作成
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// 3. Contextを使用するカスタムフック
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// 4. 実際にコンテキストを利用するコンポーネント
const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#000030",
        color: theme === "light" ? "#000" : "#fff",
        padding: "20px",
        textAlign: "center",
        height: "100vh", // 画面いっぱいの高さにする
        display: "flex", // コンテンツを中央に配置
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className="font-bold ">Current Theme: {theme}</h1>
      <button onClick={toggleTheme} style={{ fontSize: "2em", fontWeight: "bold" }}>
        Toggle Theme
      </button>
    </div>
  );
};

// 5. アプリにProviderを適用
const App = () => {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
};

export default App;
