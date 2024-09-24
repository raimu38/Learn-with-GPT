function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`${ms}msの処理が完了しました`);
      resolve(ms);
    }, ms);
  });
}

const wait400 = wait(400);
const wait500 = wait(500);
const wait600 = wait(600);

Promise.all([wait500, wait600, wait400]).then(
  ([resolve500, resolve600, resolve400]) => {
    console.log("すべてのPromiseが完了しました");
    console.log(resolve500, resolve600, resolve400);
  }
);
