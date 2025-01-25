let val = -1;

function timer(callback) {
  setTimeout(function () {
    const val = Math.floor(Math.random() * 11);
    callback(val);
  }, 1000);
}
function operations(val) {
  console.log(val);
}

timer(operations);

function delay(fn, message, ms) {
  setTimeout(function () {
    fn(message);
  }, ms);
}

delay(console.log, "こんにちは", 1000);
delay(console.log, "さようなら", 2000);
delay(
  function (message1) {
    console.log(message1);
    delay(console.log, "2秒立ちました", 1000);
  },
  "1秒立ちました",
  1000
);

delay(console.log, "こんにちわ", 1000);

delay(
  function (message1) {
    console.log(message1);
    delay(console.log, "2秒立ちました", 1000);
  },
  "1秒立ちました",
  1000
);
