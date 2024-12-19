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
