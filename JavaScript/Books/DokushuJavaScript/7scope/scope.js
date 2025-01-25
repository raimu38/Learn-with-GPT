function factory(greeting) {
  function innerFn(name) {
    console.log(greeting + " " + name);
  }

  return innerFn;
}
hello = factory("こんにちわ");
hello("おかしら");

function incrementFactory() {
  let count = 0;
  return function () {
    console.log(++count);
  };
}

const increment = incrementFactory();
increment();
increment();
increment();

function delayMessageFactory(printFs, ms) {
  return function (msg) {
    setTimeout(function () {
      printFs(msg);
    }, ms);
  };
}

const dialog = delayMessageFactory(console.log, 2000);
dialog("Hello");

function delayMessageFactory1(fn, time) {
  return function (msg) {
    setTimeout(function () {
      fn(msg);
    }, time);
  };
}

const log = delayMessageFactory1(console.log, 1000);
log("Good");
