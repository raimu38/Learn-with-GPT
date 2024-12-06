let instance = new Promise((resolve, reject) => {
  setTimeout(() => {
    const rand = Math.floor(Math.random() * 11);

    if (rand < 5) {
      reject(rand);
    } else {
      resolve(rand);
    }
  }, 1000);
});

instance = instance.then((value) => {
  console.log(`5以上の値${value}が渡ってきました`);
});

instance = instance.catch((errorvalue) => {
  console.log(`5未満の値[${errorvalue}]が渡って来たためエラー表示`);
});

instance = instance.finally(() => {
  console.log("処理を終了します");
});

let dateProm = new Promise((resolve, reject) => {
  setTimeout(() => {
    const date = new Date();
    const second = date.getSeconds();
    if (second % 2 === 0) {
      resolve(second);
    } else {
      reject(second);
    }
  }, 1000);
})
  .then((value) => {
    console.log(`[${value}]は偶数のため、成功とします`);
  })
  .catch((value) => {
    console.log(`[${value}]は奇数のため、エラ-とします`);
  })
  .finally(() => {
    console.log("処理を終了します");
  });
