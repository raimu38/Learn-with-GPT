ディレクトリ構造
以下は、Next.jsのappディレクトリを使用して、グローバルなユーザー情報管理を行うためのディレクトリ構造です。
/my-app
  /app
    /components
      UserProvider.tsx   // UserContext を提供するコンポーネント
    /layout.tsx          // グローバルレイアウト
    /page.tsx            // トップページ
    /profile
      page.tsx           // ユーザープロファイルページ
  /public
  /styles
  /utils
    firebase.ts          // Firebase 設定と初期化
  .gitignore
  package.json
  README.md

UserProvider コンポーネント app/components/UserProvider.tsx


import React, {createContext, useContent, useEffect, useState, ReactNode} from 'react'
