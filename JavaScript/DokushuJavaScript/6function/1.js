function sum(val1, val2) {
  return val1 + val2;
}

function multiply(val1, val2) {
  return val1 * val2;
}

console.log(multiply(7, 9));
console.log(multiply(-11, 9));

function noArgumentFunc() {
  return "引数がない関数でaす";
}

console.log(noArgumentFunc());

console.log(multiply(9, 2, 3));

function printSum(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    console.log("引数の可が不正です");
    return;
  }
  console.log(a + b);
}

printSum(2, 4);
printSum("1", 4);

function hello() {
  return "Hello World";
}

console.log(hello());

function hello1(personName) {
  if (typeof personName !== "string") {
    console.log("引数に文字列をわたしてください");
  }
  console.log(`こんにちは、${personName}`);
  return;
}

hello1(32);
hello1("らいむくん");

//関数式を使うと変数と関数名が被ってしまうのを防ぐことができる。
//引数をtラ無い場合は値が入力されている変数と間違えるか？関数名()と記述されているからまちがえないのではないか
//変数もその値を出力するという意味ではreturn a ;のようなた引数aを返す関数と同じだからプロパティも実質シンプルな関数とみなせる？
//変数に関数をいれるということは変数には関数が記述されているアドレスが保存される。一方 functioin 関数名　と記述したときもはどの用に保存されるのか？呼び出すときに関数名を書くから変数にだ関数式を代入するのとやっていることは同じなのだろうか
//関数でできることは？　オブジェクトにいれる時　場合分けしながらバリデーションを使うときは正常な値を返すreturnは最後に持ってきたほうが統一されてて読みやすくなりそう。
//関数宣言と関数式の違いは？関数式の場合は機能を上書きできる。
const minus = function (val1, val2) {
  return val1 - val2;
};

let result = minus(10, 5);

console.log(result);

type = "module";

function chofuku() {
  console.log("hello");
}

hello2();

function hello2() {
  console.log("こんにちわむー");
}

//関数期は関数定義前に呼び出しても動作しない
// hello3();

// const hello3 = function () {
//   console.log("まだだよー");
// };

//functionコンストラクタ
const add = new Function("val1", "val2", "return val1 + val2");
console.log(add(4, 3));

function plus(a, b = 5) {
  return a + b;
}

console.log(plus(10));
console.log(plus(null, undefined));

function calcAreaOfCircle(radius, pi = 3) {
  return pi * radius ** 2;
}

console.log(calcAreaOfCircle(3));
console.log(calcAreaOfCircle(3, 3.14159265258979323846364338));

// ??= 左辺がnull or undefindなら 右辺の値を代入する
function fn(obj = {}) {
  obj.arg1 ??= 1;
  obj.arg2 ??= 2;
  console.log(obj.arg1, obj.arg2);
}

param = { arg3: 9 };
fn(param);

const obj1 = { var: 1 };

function fn1(obj2) {
  obj2 = { val: 2 };
  console.log(obj2.val);
}

fn1(obj1);

console.log(obj1.var);

const obj01 = { num: 3 };
const obj02 = { num: 3 };
let num = 3;

function fn(object1Arg = {}, object2Arg = {}, numberArg) {
  object1Arg = { num: 5 };
  object2Arg.num = 5;
  numberArg = 5;
}

fn(obj01, obj02, num);

console.log(obj01.num); //3
console.log(obj02.num); //5
console.log(num); //3

//コールバック関数

function fn() {}

fn.fullName = "独習太郎";

fn.hello = function () {
  console.log("こんにちわ");
};

console.log(fn.fullName);

fn.hello();

function hello(name) {
  console.log(`こんにちは、${name}`);
}
const obj = hello;

obj("らいむ");

function saySometing(callback) {
  const result = callback();
  console.log(`${result}、独習太郎`);
}

function hello2() {
  return "こんにちわ";
}

function bye() {
  return "さようなら";
}

saySometing(hello2);

saySometing(bye);

function hello() {
  console.log("こんにちわ");
}

setTimeout(hello, 3000); //hello()としない

function hello() {
  console.log("こんにちわ");
}

setTimeout(hello, 5000);

function hello(name) {
  console.log(`こんにちわ${name}`);
}

setTimeout(hello, 2000, "らいむ");

function plus(a, b) {
  return a + b;
}

function minus1(a, b) {
  return a - b;
}

function calc(val1, val2, callback) {
  console.log(callback(val1, val2));
}

calc(2, 4, plus);
calc(4, 5, minus1);

setTimeout(function () {
  console.log("こんちくわ");
}, 2000);

const hello5 = function () {
  console.log("こんにちわ5");
};

hello5.toString();

setTimeout(hello5, 3000);

() => console.log("こんにちわアロー");

setTimeout(() => console.log("こんにちわアロー"), 100);

setTimeout((num) => console.log(`${num * 2} + "アロー"`), 1, 300);

setTimeout(
  (name) => {
    console.log("こんにちわ" + name);
  },
  300,
  "らむ"
);

function add2(val1, val2) {
  return val1 + val2;
}
function minus3(val1, val2) {
  return va1 - val2;
}

function calAndDisp(callback, callback2, val1, val2) {
  const result = callback(val1, val2);
  callback2(result);
}

calAndDisp(add2, console.log, 3, 200);
// calAndDisp(minus3, alert, 4, 2);

const fn01 = (num1, num2) => num1 + num2;
const fn2 = (num) => num * 2;
const f3 = () => console.log("Hello World");
const fn4 = (name) => {
  console.log("HEllo world");
  console.log(`Hello ${name}`);
};

const fn5 = () => ({ name: "独習太郎 アロー" });
fn5();
