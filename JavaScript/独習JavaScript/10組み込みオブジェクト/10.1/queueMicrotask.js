console.log("スタート");

queueMicrotask(() => {
  console.log("Microtask 実行");
});

console.log("エンド");

const result = confirm("本当に削除しますか？");
if (result) {
  console.log("削除を実行します");
} else {
  console.log("削除をキャンセルしました");
}

let counter = 0;

const intervalId = setInterval(() => {
  counter++;
  console.log(counter);

  if (counter === 3) {
    clearInterval(intervalId);
    console.log("インターバル終了");
  }
}, 1000);
