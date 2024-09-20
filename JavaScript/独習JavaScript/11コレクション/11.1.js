let fruits = ["banana", "orage", "apple"];
console.log(fruits);

const empptyArray = new Array(3);
console.log(empptyArray);
const filledArray = new Array(1, 3, 4);
console.log(filledArray);

fruits[2] = "paineapple";
console.log(fruits);

console.log(fruits.length);
console.log(fruits[fruits.length - 1]);

const array2D = [
  ["太郎", "25歳", "男"],
  { name: "花子", age: "23歳", gender: "女" },
];

console.log(array2D[1]);

console.log(array2D[0][0]);

console.log(array2D[0][2]);

console.log(array2D[1].name);
console.log(array2D[1]["gender"]);

fruits.push("peach");
console.log(fruits);

fruits = ["banana", "orage", "apple"];
fruits.unshift("lemon");
console.log(fruits);
let returnVal = fruits.shift(); //配列からの削除と戻り地に返すという２つを実行:
console.log(fruits);
console.log(returnVal);

fruits = ["banana", "orange", "apple"];
returnVal = fruits.pop();
console.log(fruits);
console.log(returnVal);

fruits = ["banana", "orange", "apple"];
let deletedVal = fruits.splice(1, 2);
console.log(fruits);

console.log(deletedVal);

fruits = ["banana", "orange", "apple"];
//第３引数以下に好きな数だけ追加できる
fruits.splice(1, 2, "kiui", "melon", "kokonuts");
console.log(fruits);

fruits.splice(2, 1);
console.log(fruits);

let animal = ["cat", "dpg", "hamustar"];
let addanimal = ["pork", "cow", "pig"];
let newanimal = animal.concat(addanimal);

console.log(newanimal);

let copyanimal = animal.concat();
console.log(copyanimal);

let sliceanima = newanimal.slice(2, 4);
console.log(newanimal);
console.log(sliceanima);

animal = ["cat", "dog", "hamustar", "dog"];
const found = animal.indexOf("dog");
console.log(found);

const arry = animal;
console.log(arry.join("とね"));

const arry1 = [];
for (let i = 0; i < 100; i++) {
  arry1.push(0);
}

console.log(arry1);

const arry2 = new Array(100);
arry2.fill(1);
console.log(arry2);
console.log(new Array(50).fill(2));

const arry3 = [1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
arry3.fill(4, arry3.length - 10, arry3.length - 5);
console.log(arry3);

const arry3D = [1, [2], 3, [4, [5, 6]]];

const arry2D0 = arry3D.flat();
console.log(arry2D0);
const arry1D0 = arry2D0.flat();
console.log(arry1D0);

const arry5 = [1, 2, 3, 4, 5];
arry5.reverse();
console.log(arry5);

let chuka = ["八宝菜", "餃子", "回鍋肉", "青淑肉糸糸"];

chuka.push("天津飯");
console.log(chuka);
chuka.unshift("チャーハン");
console.log(chuka);
chuka.shift();
console.log(chuka);
chuka.pop();
console.log(chuka);
chuka.splice(2, 1);
console.log(chuka);
console.log(chuka.indexOf("餃子"));
chuka = chuka.concat(["杏仁豆腐", "ごま豆腐"]);
console.log(chuka);
newchuka = chuka.slice(1, 4);
console.log(newchuka);
console.log(newchuka.reverse());
console.log(newchuka.includes("八宝菜"));

const arry6 = [1, 2, 3, 4, 5];
arry6.forEach(function (value, index, arry) {
  console.log(value * 5);
});

const arry7 = [1, 2, 3, 4, 5];
const newarry7 = arry7.map(function (value) {
  return value * 3;
});
console.log(newarry7);

const allowaary7 = arry7.map((value) => value * 4);
console.log(allowaary7);
