class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.value = Math.random();
    Singleton.instance = this;
    return this;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();
