// 問題1: 型注釈
// 次の変数宣言に適切な型注釈を追加してください。

let age = 25;
let name = "Alice";
let isStudent = true;

// 解説1
// 型注釈は、変数や関数の型を明示するために使用されます。
let age: number = 25;
let name: string = "Alice";
let isStudent: boolean = true;
// ここでは、ageは数値、nameは文字列、isStudentは真偽値です。型注釈を追加することで、コードの可読性と安全性が向上します。

// 問題2: 関数の型注釈/
// 次の関数に適切な型注釈を追加してください。
function add(a, b) {
  return a + b;
}

// 解説2
// 関数の引数と戻り値に型注釈を追加することで、関数の使用方法が明確になります。
function add(a: number, b: number): number {
  return a + b;
}
// ここでは、aとbは数値であり、戻り値も数値です。これにより、関数が数値を受け取り数値を返すことが明確になります。

// 問題3: インターフェース
// 次のコードにインターフェースを使用して型を定義してください。
const user = {
  name: "Alice",
  age: 25,
  isStudent: true
};

interface: User = {
  name: stirng;
  age: number;
  isStudent: boolean;
}
const user:User ={
  name: "Alice",
  age: 25,
  isStudent: true
};
