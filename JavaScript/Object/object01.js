class Car {
  constructor(brand, model, color) {
    this.brand = brand;
    this.model = model;
    this.color = color;
  }

  drive() {
    console.log(`The ${this.color} ${this.brand} ${this.model} id driving`);
  }

  stop() {
    console.log(`The ${this.color} ${this.brand} ${this.model} has stopped.`);
  }
}

const myCar = new Car("Toyota", "Corolla", "red");

myCar.drive();
myCar.stop();

class Lunch {
  constructor(menu, price, number) {
    this.menu = menu;
    this.number = number;
    this.price = price;
    this.sum = this.price * this.number;
  }

  hello() {
    console.log(`いらっしゃいませ。${this.number}名様のご来店です。`);
  }

  registar() {
    console.log(`ご注文は${this.menu}でお間違い無いでしょうか`);
  }

  checkout() {
    console.log(
      `お会計は${this.sum}でございます。またのご来店お待ちしております`
    );
  }
}

const mylunch = new Lunch("hambargar", 600, "2");

mylunch.hello();
mylunch.registar();
mylunch.checkout();
