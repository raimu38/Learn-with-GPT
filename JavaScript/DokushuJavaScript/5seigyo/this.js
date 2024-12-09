const fruits = { apple: "りんご", banana: "バナナ" };
const props = Object.keys(fruits);
console.log(props);
const values = Object.values(fruits);
console.log(values);

for (prop of props) {
  console.log(prop, fruits[prop]);
}

for (value of values) {
  console.log(value);
}

const entries = Object.entries(fruits);
console.log(entries);

for (entry of entries) {
  console.log(entry[0], entry[1]);
}
