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
import {auth, firestore} from '../../utils/firebase';

interface UserContextType{
  user: any;
  loading:boolean;
}

const   = createContext<UserContextType | undefined>(undefined);

export const UserProvider =({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( async (currentUser)=> {
      if(currentUser){
        const useRef = firebase.collection('users').doc(currentUser.uid);
        const doc = await useRef.get();
        if (doc.exists){
          setUser(doc.data());
        }
      }else{
        setUser(null);
      }
      setLoading(false);
  });

  return() => unsubscribe();

  },[]);

  return (
    <UserContext.Provider value={{user, loading}}>
      {children}
    </UserContext.Provider>
    );
  )
};

  export const useUser = () => {
    const context = useContext(UserContext);
    if(!context){
      throw new Error('useUser must be used within a UserProvider');
  };
    return context;
  };


3. グローバルレイアウト (/app/layout.tsx)

import {UserProvider} from './components/UserProvider';
import './styles/globals.css';

export default function RootLayout({children} : {children.React.Node}){
  return(
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );  
}

import {useUser} from './components/UserProvider';

export default function HomePage(){
  const {user, loading} = useUser();

  if(loading) return <div>Loadig ...</div>;

  return(

      <div>
        <h1>Home Page</h1>
        {user ? (
          <div>Welcome ,{user.name}!</div>
        ):(
        <div>Please sign in.</div>
        )}
      </div>
  )
}


5. ユーザープロファイルページ (/app/profile/page.tsx)

// /app/profile/page.tsx









  
