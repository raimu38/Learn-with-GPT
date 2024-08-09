
Firestoreのmap構造を用いてリソースを最小限にする

一つのドキュメントの中に複数のユーザー情報を含むMap構造があり、その中で特定のユーザーの情報だけを更新したい場合の方法を説明します。

Firestore データ構造
以下のような構造を持つFirestoreドキュメントがあるとします:
/users
  /userId
    - userDetails: {
        user1: {
          name: "John Doe",
          age: 30
        },
        user2: {
          name: "Jane Smith",
          age: 25
        },
        user3: {
          name: "Alice Johnson",
          age: 28
        }
      }


一つのドキュメントの中に複数のユーザー情報を含むMap構造があり、その中で特定のユーザーの情報だけを更新したい場合の方法を説明します。

Firestore データ構造
以下のような構造を持つFirestoreドキュメントがあるとします:

特定のユーザー情報を更新する方法
例えば、user2の情報を更新したい場合、以下のようにupdateメソッドを使用して、ネストされたMap内の特定のフィールドだけを更新します。

import firebase from 'firebae/app';
import 'firebase/firestore';

const updateUserDetails = async(userId, targetUserId, newName, newAge)=>{
  const db = fiebase.firestore()
  const userRef = db.collecioin('users').doc(userId);

  try{
    await userRef.update({
      [`userDetails.${targetUserId}.name`]: newName,
      [`userDetails.${targetUserId}.age`]: newAge,
    })
    console.log('User details upadate successfully!`);
                }catch(erroe){
    console.log('Error updating user details:',error);
  }
};

updateUserDetails('userId', 'user2', 'Jony Dep', 38);

const userRef = db.collection('users').doc(userId);
  usersコレクションの中のuserIdドキュメントを参照する
ネストされた　Map内のフィールドを指定。
・[`userDetails.${targetUserId}.name`]このように
バッククオートと${}を使って`userDetails内の`targetUserId`サブMapの`name`フィールドを指定
・同様に[`userDetails.${TargetUserId}.age``]でageフィールドを指定

更新
updateメソッドを指定して指定したフィールドの値を更新する。




ユーザーが自分のIDに基づいて自分の情報を更新できるようにするためには、Firebase Authenticationで認証されたユーザーのIDを取得し、それをFirestoreのドキュメントでの操作に利用します。以下の手順で、ユーザーが自分の情報を更新する機能を実装できます。

1. Firebase AuthenticationからユーザーIDを取得
Firebase Authenticationを使用して、現在認証されているユーザーのIDを取得します。

2. FirestoreのMap内の特定のユーザー情報を更新
以下は、Firebase Authenticationから取得したユーザーIDを用いて、FirestoreのuserDetailsMap内の自分の情報を更新するコードの例です。


import firebase form 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const updateUserDetails = async(newName, newAge, userdetail)=>{
  const user = firebase.auth().currentUser:

  if(!user){
    console.log('No user is sigend in.');
    return;
  }

  const userId = user.uid;
  const db = firebase.firestore();
  const userRef = db.collection('users').doc(userdetail);

  try{
    await userRef.update({
      [`userDetails.${userId}.name`]: newName,
      [`userDetails.${userId}.age`] : newAge
    });
    console.log('User details updated successfully');
  }cathc(error){
    console.log('Error updating user details:' ,error);
  }  
};

updateUserDetails ('New Name', 42, 'userdetail');

ユーザーIDの取得:

const user = firebase.auth().currentUser;
現在認証されているユーザーを取得します。
const userId = user.uid;
認証されたユーザーのIDを取得します。
Firestoreドキュメントのリファレンス:

const userRef = db.collection('users').doc(userId);
usersコレクション内の現在のユーザーIDに基づくドキュメントのリファレンスを作成します。
Map内のフィールドの更新:

[userDetails.${userId}.name]
ユーザーの情報が格納されているMap内の、特定のユーザーIDに基づくフィールドを指定して更新します。
同様に、ageフィールドも更新します。




























