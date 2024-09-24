function promiseFactory(count) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      count++;
      console.log(
        `${count}回目のコールです。時刻:[${new Date().toTimeString()}]`
      );

      if (count === 3) {
        reject(count);
      } else {
        resolve(count);
      }
    }, 1000);
  });
}

promiseFactory(0)
  .then((count) => {
    return promiseFactory(count);
  })
  .then((count) => {
    return promiseFactory(count);
  })
  .then((count) => {
    return promiseFactory(count);
  })
  .then((count) => {
    return promiseFactory(count);
  })
  .catch((erroeCount) => {
    console.log(`エラーに飛びました。現在のカウントは${erroeCount}です);
    }`);
  })
  .finally(() => {
    console.log("処理を終了します");
  });

function countupPromise(count) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      count += 2;
      console.log(count);

      if (count === 6) {
        reject(count);
      } else {
        resolve(count);
      }
    }, 1000);
  });
}

countupPromise(0)
  .then((count) => {
    return countupPromise(count);
  })
  .then((count) => {
    return countupPromise(count);
  })
  .then((count) => {
    return countupPromise(count);
  })
  .then((count) => {
    return countupPromise(count);
  })
  .then((count) => {
    return countupPromise(count);
  })
  .catch((errorCount) => {
    console.log(`${errorCount}なんでエラーですよん`);
  })
  .finally(() => {
    console.log("処理を終了します");
  });
