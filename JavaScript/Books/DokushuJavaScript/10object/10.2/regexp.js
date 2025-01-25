// function replacer(prop, value) {
//   console.log(`prop[${prop}]value[${value}]`);
//   return value;
// }

// const nestedObj = { a: { b: { c: 0 } } };
// const jsonStr = JSON.stringify(nestedObj, replacer);
// console.log(jsonStr);

const target = { a: 0, b: 1, c: { d: 2, e: 0, f: "hello" } };

console.log(JSON.stringify(target));

console.log(JSON.stringify(target, ["a", "b"]));

console.log(JSON.stringify(target, ["e", "f"]));

function replacer(prop, value) {
  if (typeof value === "number" && value < 1) {
    return;
  }
  if (typeof value === "string") {
    return;
  }
  return value;
}

console.log(JSON.stringify(target, replacer));
console.log(JSON.stringify(target, null, "\t"));

// const json = `{"b": 1, "c": {"d": 2, "f":"hello"}}`;
// console.log(json);
// const obj = JSON.parse(json);
// console.log(obj);

let data = localStorage.getItem("data");
data = JSON.parse(data);

if (data === null) {
  data = { val: 0 };
}

console.log(data.val);

data.val++;

const json = JSON.stringify(data);

localStorage.setItem("data", json);

const fruits = {
  banana: "うまい",
  apple: "普通",
  orange: "微妙",
  other: { grape: "うまい" },
};

// console.log(JSON.stringify(fruits, ["banana", "orange"]));

function replacer(prop, value) {
  if (typeof value === "string" && value !== "うまい") {
    return;
  }

  return value;
}

console.log(JSON.stringify(fruits, replacer));

const str = "hello";
console.log(str instanceof String);
