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


// 解説3
// インターフェースは、オブジェクトの構造を定義するために使用されます。
interface User {
  name: string;
  age: number;
  isStudent: boolean;
}

const user: User = {
  name: "Alice",
  age: 25,
  isStudent: true
};
// これにより、userオブジェクトがUserインターフェースに従うことが保証されます。

// 問題4: ユニオン型
// 次の関数にユニオン型を使用して型注釈を追加してください。

function printId(id) {
  console.log(id);
}
// 解説4
// ユニオン型は、変数が複数の型を持つことを許可します。

function printId(id: number | string): void {
  console.log(id)
}
// ここでは、idは数値または文字列のいずれかであり、戻り値はvoid（何も返さない）です。

// 問題5: 型のエイリアス
// 次のコードに型のエイリアスを使用してください。
type Point = { x: number, y: number };

function printPoint(point: { x: number, y: number }) {
  console.log(`x: ${point.x}, y: ${point.y}`);
}


// 解説5
// 型のエイリアスは、複雑な型を簡潔に表現するために使用されます。
type Point = { x: number, y: number };

function printPoint(point: Point): void {
  console.log(`x: ${point.x}, y: ${point.y}`);
}
// これにより、Point型が再利用可能になり、コードの可読性が向上します。

// 問題6: ジェネリック型
// 次の関数にジェネリック型を追加してください。
function identity(arg) {
  return arg;
}

// 解説6
// ジェネリック型は、関数やクラスがさまざまな型で動作することを可能にします。
function identity<T>(arg: T): T {
  return arg;
}
// ここでは、Tは任意の型を表し、argと戻り値が同じ型であることを保証します。

// 問題7: 非nullアサーション
// 次のコードに非nullアサーションを使用してください。
let myValue: string | null = null;
console.log(myValue.length);

// 解説7
// 非nullアサーションは、変数がnullでないことを保証します。
let myValue: string | null = null;
console.log(myValue!.length);
// これにより、myValueがnullでないことを保証し、lengthプロパティにアクセスできます。

// 問題8: オプショナルチェイニング
// 次のコードにオプショナルチェイニングを使用してください。
const user = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "Wonderland"
  }
};

console.log(user.address.street);

// 解説8
// オプショナルチェイニングは、オブジェクトのプロパティが存在するかどうかを確認せずにアクセスできます。
const user = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "Wonderland"
  }
};

console.log(user.address?.street)
// これにより、addressが存在しない場合でもエラーを避けることができます。

// 問題9: 型ガード
// 次の関数に型ガードを追加してください。
function isString(value: any): boolean {
  return typeof value === 'string';
}

function printValue(value: string | number) {
  if (isString(value)) {
    console.log(`String: ${value}`);
  } else {
    console.log(`Number: ${value}`);
  }
}

// 解説9
// 型ガードは、ランタイムで型を確認し、安全に値を操作するために使用されます。

function isString(value: any): value is string {
  return typeof value === 'string';
}

function printValue(value: string | number) {
  if (isString(value)) {
    console.log(`String: ${value}`);
  } else {
    console.log(`Number: ${value}`);
  }
}
// ここでは、isString関数が値が文字列であることを保証する型ガードとして機能します。

// 問題10: 型のインターセクション
// 次のコードに型のインターセクションを使用してください。
                  
type Name = { name: string };
type Age = { age: number };

const person: Name & Age = {
  name: "Alice",
  age: 25
};

type Name = { name: string };
type Age =  { age : number };

const person: Name & Age = {
  name: "Alice",
  age : 19
};





