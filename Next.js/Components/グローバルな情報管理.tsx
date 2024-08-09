基本メソッド

・createContext: コンテキストを作成
・useContext: コンテキストから値を取得するためのフック
・useEffect: 副作用を管理するフック。コンポーネントのライフサイクルに関連する処理を行う
・useState:状態を管理するためのフック
・ReactNode: コンポーネントの子要素の型
・useEffect(() => {}, []);
依存配列がからのときはマウント時に一度だけ実行される。



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

import {useUser} from '../components/UserProvider';

export default function ProfilePage(){
const {user, loading} = useUser();

if(Loding) return <div>Loading ...</div>
  return(
    <h1>Profile Page</h1>
      {user ? (
      <div>
        <p>Name : {user.name)</p>
        <p>Age : {user.age}</p>
      </div>
      ):(
        <div>No user data available.</div>
      )
      
  )
};

      
import React. {createContext, useContext, useEffect, userState, ReactNode}
import {auth, firestore} from '../../utils/firebase';


interface UserContextType{
 user : any;
loading: boolean;      
}

  // userContextTypeというインターフェースを定義
  // user , loading という2つのプロパティをもつ
  // createContextでコンテキストを作成
  //  アプリケーション全体でユーザー情報を共有できる

const UserConText = createContext<UserContextType | undefined>(undefined);
      
export const User Provider = ({children}: {children: ReactNode}) => {
// 役割: 子コンポーネントにユーザー情報とローディング状態を提供します。
const [user, setUser] = useState<any>(null);
const [loading, setLoading] = useState<boolean>(true);

  useEffect(() =>{ //ユーザー認証を監視しユーザー情報を取得して状態を更新する。
    const unsubscribe  = auth.onAuthStateChanged(async (currentUser) => {
      
    
  });

  
}


コールバック関数:他の関数に引数として渡される関数。渡された関数は指定されたイベントや処理が完了したときに呼び出される

  function callbackFunction(){
  }
  // コールバック関数

  function performAction(callback){
    callback()//コールバック関数を呼び出す
  }


  performActioin(callbackFunction);

  function applyFunction(arr, callback){
    for (let i = 0; i < arr.length; i++){
      arr[i]  = callback(arr[i]);
    }
    return arr;
  }

  function double(x){
    return x * 2;
  }

  const numbers  = [1,3,5,6]
  const doubleNumbers = applyFunction(numbers, double);

  console.log(doubleNumbers);

  export const UserProvider = ({children}: {chiledren: ReactNode}) =>{
    const [user, setUser] = useState<any>(null);
    const [loading, setLoding] = useState<boolean>(true);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (current) => {
        if(currentUser){
          const useRef = firestore.collection('users').doc(currentUser.uid);
          const doc = await useRef.get();
          if(doc.exists){
            setUser(doc.data());
          }
        }else{
          setUser(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
  },  []);

    return(
      <UserContext.Provider value={{user, loading}}>
        {children}
      </UserContext.Provider>
    )
    //UserCOntextを使用してコンポーネントツリー内のすべての子コンポーネントにユーザー情報とローディング情報を提供


    useUserフック

    export const useUser = () => {
      const context = useContext(UserContext);
      if (context === undefined){
        trhow new Error('useUser must be used within a UserProvider');
      }
      return context;
    };




コンポーネントとフックの関係図

    +---------------------------+
|                           |
|       React Component     |
|                           |
|   +-------------------+   |
|   |                   |   |
|   |  useState()       |   |
|   |  useEffect()      |   |
|   |  useContext()     |   |
|   |                   |   |
|   +-------------------+   |
|                           |
|   +-------------------+   |
|   |  Custom Hook      |   |
|   |  (e.g. useUser)   |   |
|   +-------------------+   |
|                           |
+---------------------------+

全体の流れ
createContext:

コンテキストを作成します。これにより、コンテキストオブジェクトが生成され、プロバイダーとコンシューマーの機能が提供されます。
UserProvider:

作成したコンテキストオブジェクトのプロバイダーコンポーネントです。valueプロパティにコンテキストの値を設定し、それを子コンポーネントに提供します。
Component A と Component B:

これらのコンポーネントは、useContextフックを使用してUserProviderから提供されたコンテキストの値にアクセスします。コンポーネントがUserProviderでラップされている限り、コンテキストの値を共有し、使用することができます。
このようにして、コンテキストを使用することで、複数のコンポーネント間でデータを簡単に共有し、管理することができます。
      
  
コンポーネントとコンテキストの関係図
    +---------------------+
|  App                 |
|                     |
| +-----------------+  |
| | UserProvider    |  |
| | (createContext) |  |
| |                 |  |
| | +-------------+ |  |
| | | Component A | |  |
| | | (useContext) | |  |
| | +-------------+ |  |
| |                 |  |
| | +-------------+ |  |
| | | Component B | |  |
| | | (useContext) | |  |
| | +-------------+ |  |
| +-----------------+  |
+---------------------+


  ラップするとはコンポーネントを他のコンポーネントで囲むこと
    ラップしたコンポーネントを親呼ぶ

意味: あるコンポーネントを他のコンポーネントで囲むこと。ラッピングしたコンポーネントは、ラップされたコンポーネントの親になります。
効果: ラッピングしたコンポーネントが、ラップされたコンポーネントに対して共通の状態や機能を提供します。

ラップする場合の例

function App() {
  return(
    <UserProvider>
      <ComponentA/>
      <ComponentB/>
    </UserProvider>
  ) 
}


    function UserProvider({children}) {
      const user = {name: "John Doe", age: 29};
      return(
        <UserContext.Provider value={user}>
          {children}
        </UserContext.Provider>  
        
      )
    }

    function ComponentA(){
      const user = useConntext(UserContext);
      return<div>User A : {user.name}</div>
      
    }

    function ComponentB(){
      const user = useContext(UserContext);
      return <div>User B : {user.name}</div>
    }



import React, {createContext, useContext, ReactNode} from 'react';

const UserContext = createContext<{name : string: age:number} | undefined>(undefined);

function UserProvider({children}: {children: ReacNode}){
  const user = {name: 'John Doe', age: 43};

  return(
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}


function ComponentA(){
  const user = useContext(UserContext);
  if(!user) return <div>Loading...</div>
  return <div>User A: {user.name}</div>

function ComponentB(){
  const user = useContext(UserContext);
  if(!user) return <div>Loading...</div>
  return <div>User B: {user.name}</div>
}



function App(){
  return(
    <UserProvider>
      <ComponentA/>
      <ComponentB/>
    </UserProvider>
  )
  
}












    
      
  
