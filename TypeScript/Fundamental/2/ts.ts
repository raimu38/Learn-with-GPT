function kata() {
  let age: number = 30;
  let name: string = "katou";
  let isDone: boolean = true;

  const array: (string | number)[] = [];
  const mixedArrayT: [string, number][] = [["foo", 1]];
  array.push("konnnitiha");
  array.push(1);
  mixedArrayT.push(["woo", 9]);

  console.log(mixedArrayT);
  console.log(mixedArrayT[1][1]);
  console.log(mixedArrayT.length);
}

kata();

function objectgata() {
  const user: { name: string; age: number; height?: number } = {
    name: "Takaya",
    age: 89,
  };

  console.log(user.name, user.age);
}
objectgata();

function anygata() {
  let userA: any = { firstName: "Takuya" };

  console.log(userA.firstName, userA.age);
}
anygata();

type Point = {
  x: number;
  y: number;
};

function printPoint(point: Point) {
  console.log(`x座標は${point.x}`);
  console.log(`y座標は${point.y}`);
}

// printPoint({x:23,y:23}:Point)
