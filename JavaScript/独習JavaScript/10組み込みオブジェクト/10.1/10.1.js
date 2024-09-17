let count = 1;
const counter = setInterval(() => {
  console.log(`${count}回目`);
  count++;
}, 1000);

setTimeout(() => {
  clearInterval(counter);
  console.log("カウンターが停止しました");
}, 5000);
