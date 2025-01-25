const myResolve = new Promise((resolve) => {
  setTimeout(() => {
    resolve("resolveが呼ばれました");
    console.log("myResolveの事項が終了しました。");
  }, 100);
});

const myReject = new Promise((_, reject) => {
  setTimeout(() => {
    reject("rejectが呼ばれました");
    console.log("myRejectが終了しました");
  }, 2000);
});

Promise.race([myReject, myResolve])
  .then((value) => {
    console.log(value);
  })
  .catch((value) => {
    console.log(value);
  });
