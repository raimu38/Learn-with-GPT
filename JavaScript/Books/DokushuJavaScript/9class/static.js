class StdClass {
  constructor(arg) {
    this.arg = arg;
  }

  static printFn = console.log;

  static print(arg) {
    StdClass.printFn(arg);
  }

  print() {
    this.constructor.print(this.arg);
  }
}

const std = new StdClass("こんにちは");
std.print();

class Person1 {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  get fullname() {
    return this.lastname + this.firstname;
  }

  set age(value) {
    this._age = Number(value);
  }

  get age() {
    return this._age;
  }

  set gender(value) {
    if (value === "男" || value === "女" || value === "トランスジェンダー") {
      this._gender = value;
    } else {
      throw new Error(
        'genderプロパティには"男","女",または"トランスジェンダー"を設定してください'
      );
    }
  }

  get gender() {
    return this._gender;
  }
}

const yamada = new Person1("hono", "yamada");

console.log(yamada.fullname);

yamada.age = "21";

console.log(yamada.age);

console.log(yamada);
try {
  yamada.gender = "おはよう";
} catch (e) {
  console.error(e.message);
}

console.log(yamada.gender);

class Parent {
  constructor(value) {
    this.parentProp = value;
  }

  parentMethod() {
    console.log("親のクラスメソッド");
  }
}

class Child extends Parent {
  constructor(parentProp, childProp) {
    super(parentProp);
    this.childProp = childProp;
  }

  childMethod() {
    console.log(`子から親にアクセス[${this.parentProp}]`);
  }
}

const kodomo = new Child("親", "子");

console.log(kodomo);

kodomo.parentMethod();

kodomo.childMethod();

class Parent1 {
  constructor(value) {
    this.familyName = value;
  }

  introduction() {
    console.log(`名字は${this.familyName}です`);
  }
}

class Child1 extends Parent1 {
  constructor(familyName, childNamevalue) {
    super(familyName);
    this.childName = childNamevalue;
  }
  childNameIntroduction() {
    console.log(`名前は${this.childName}です`);
  }
}

const youko = new Child1("独習", "ようこ");

youko.introduction();
youko.childNameIntroduction();

class Book {
  constructor(bookNameValue) {
    this.bookName = bookNameValue;
  }

  buybook() {
    console.log("いらっしゃいませ ");
  }
}

const book1 = new Book("独習JavaScript");

console.log(book1.hasOwnProperty("bookName"));
console.log("bookName" in book1);

console.log(book1.hasOwnProperty("buybook"));
console.log("buybook" in book1);

class Counter {
  #count = 0;

  #print() {
    console.log(this.#count);
  }

  increment() {
    this.#count++;
    this.#print();
  }
}

const counter = new Counter();
counter.increment();

// counter.#count = 10;
// counter.#print();

class Person2 {
  #lastname = "独習";
  #firstname;
  #age;

  constructor(firstname) {
    this.#firstname = firstname;
  }

  get fullname() {
    return this.#lastname + this.#firstname;
  }

  set age(value) {
    this.#age = Number(value);
  }

  get age() {
    return this.#age;
  }
}

const itirou = new Person2("itirou");

itirou.age = "29";

console.log(itirou.fullname);
console.log(itirou.age);

function Test() {}

Test.prop = "値";

console.log(Test.prop);

console.log("prototype" in Test);

console.log(Test);
function Test() {}
console.log(typeof Test.prototype);

function Person(name) {
  this.name = name;
}

Person.prototype.hello = function () {
  console.log(`こんにちは、${this.name}`);
};

const tarou = new Person("独習太郎");
tarou.hello();

const hanako = new Person("独習花子");
hanako.hello();
