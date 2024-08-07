
// 以下のようなデータ構造で授業情報を持っているとする。
{
  "classID":"class1",
  "day":"Tueseday",
  "courseName":"math",
  "time":"10:00"
}

import {collection,
const classesRef = collection(firestore, "classes")
const q = query(classRef, where("day" = "Tuesday"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  console.log(doc.id, "=>" , doc.data());
});

// コレクション内のドキュメントの個数を数える方法

import {collection} from 'firebase/firesotre';
const studentsRef = firestore.collection('students');
studentsRef.get().then((querySnapshot) => {
  console.log('Number of studentscollection is ' , querySnapshot.size)
});

// ↑コレクション内にドキュメントが50個ある場合：50回の読み取り
// コレクション内にドキュメントが200個ある場合：200回の読み取り
// これを避けるためには、ドキュメント数を管理するために追加のフィールドを使うか、リアルタイムデータベースなどの他の方法を検討する必要があります。
//これは避けるべき
