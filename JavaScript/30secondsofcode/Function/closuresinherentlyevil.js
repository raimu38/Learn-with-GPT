const initCounter = (start = 0) => {
  let value = start;
  return {
    get: () => value,
    increment: () => ++value,
    decrement: () => --value,
    reset: () => value = start
  };
}

const counter = initCounter(5);
console.log(counter.get()); // 5
console.log(counter.increment()); // 6
console.log(counter.increment()); // 7
console.log(counter.decrement()); // 6
console.log(counter.reset()); // 5

