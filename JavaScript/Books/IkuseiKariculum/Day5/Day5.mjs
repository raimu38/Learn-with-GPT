let x = 10;
x = 20; //再代入
console.log(x);

const y = 30;
const obj = { fruit: "apple" };
console.log(obj.fruit);
obj.fruit = "orange";
console.log(obj.fruit);

let age = 30;
const message = `私は${age}歳です`;
console.log(message);

function hello(name = "らいむ") {
  console.log(`こんにちは${name}`);
}

hello();
hello("ほのか");

const person = { name: "らいむ", age1: 20 };
const { name: name1, age1 } = person; //エイリアス
console.log(name1);
console.log(age1);

const ary1 = [1, 2, 3];
const [first, second] = ary1;
console.log(first);
console.log(second);

const ary2 = [2, 3, 4];
const ary3 = [3, 4, 5];
const combind = [...ary2, ...ary3];
console.log(combind);

function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

function sum0(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sum0(1, 2, 3, 4)); // 10

function sum1(...numbers) {
  return numbers.reduce((acc, num) => acc * num, 1);
}

console.log(sum1(2, 4));

export function sum5(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
