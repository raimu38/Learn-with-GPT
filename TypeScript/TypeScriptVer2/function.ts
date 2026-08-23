function doublea(base: number): number {
  return base * 2;
}

console.log(doublea(3));

let triangle = function (base: number, height: number): number {
  return (base * height) / 2;
};

console.log(triangle(3, 4));

//関数の基本的な定義 let name: (parameter: parametertype) =>returntype = function(parameter: parametertype):returntype{ return };
let triangle2: (base: number, height: number) => number = function (
  base: number,
  height: number
): number {
  return (base * height) / 2;
};

// #アロー関数
function triangle3(base: number, height: number): number {
  return (base * height) / 2;
}

console.log(triangle(2, 5));

//アロー関数 {}を外した場合　=> 囲碁を戻り地とみなす
let triangle4 = (base: number, height: number): number => (base * height) / 2;

console.log(triangle4(3, 5));

function greet(person: string): void {
  console.log(` こんにちは${person}さん`);
}
greet("佐藤しずか");

function error(): never {
  throw new Error("Error occuerd");
}

function eternal(): never {
  while (true) {
    console.log("終わりがないw");
  }
}

function showTime(time?: Date): string {
  if (time === undefined) {
    return "現在時刻は : " + new Date().toLocaleString();
  } else {
    return time.toLocaleString();
  }
}
//shoTime()の引数はundifinedの可能性もある　その場合は関数作成時の引数にtime? ?をつけることでその引数がundifinedである可能性があることを示しエラーを回避する。
console.log(showTime());

//引数に規定値を設定する Date = new Date()で既定値を設定
function showTime2(time: Date = new Date()) {
  return "現在時刻は :" + time.toLocaleString();
}

//可変長引数 引数の前に...をつけることでその引数に任意の個数をの値をいれることができ、それらは配列とみなされる

function sum(...values: number[]) {
  let result: number = 0;

  for (let value of values) {
    result += value;
  }

  return result;
}

console.log(sum(33, 35, 5, 6));

//関数のオーバーロード : 関数名は同じだがその引数　、戻り値の型が異なる関数を定義すること
//この際 function show(input: number):void;のように;セミコロンを付けたものをシグネチャという　シグネチャを付ける理由は型チェックをするため
function show(input: number): void;
function show(input: boolean): void;
function show(input: any): void {
  if (typeof input === "number") {
    console.log(input.toFixed(0));
  } else {
    console.log(input ? "真" : "偽");
  }
}

show(33);
show(true);

let data: number | boolean;

let data1: (number | string)[];

data1 = [322, 3232, 4, "fdfd"];

function sqrt(value: number): number | boolean {
  if (value < 0) {
    return false;
  } else {
    return Math.sqrt(value);
  }
}

console.log(sqrt(9));
console.log(sqrt(-2));

//型ガードをつけないバージョン　　valueのnumber方はtoUpperCaseメソッドを持たない
// function process(vlaue: string | number) {
//   return vlaue.toUpperCase;
// }

//→型ガードを付ける

function process1(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase;
  } else {
    return value.toFixed(1);
  }
}
