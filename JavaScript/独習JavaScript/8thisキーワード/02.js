//オブジェクトから呼び出し
const hanako = {
  name: "太郎",
  hello: function () {
    console.log("こんにちは" + this.name);
  },
};

hanako.hello();

const taro = {
  name: "太郎",
  hello: function () {
    const jiro = {
      name: "次郎",
      hello: () => {
        console.log("こんにちは" * this.name);
      },
    };

    jiro.hello();
  },
};

taro.hello();

window.name = "花子";

const yamada = {
  name: "山田",
  hello: function () {
    console.log("こんにちは" + this.name);
  },
};

function greet(callback) {
  callback();
}

greet(yamada.hello);
yamada.hello();

window.name = "花子";

const satou = {
  name: "佐藤",
  hello: function () {
    console.log("こんにちは" + this.name);
  },
};

const helloWho = satou.hello;

helloWho();

window.a = 10;
window.b = 11;

const obj1 = {
  a: 5,
  b: 7,
  calc() {
    console.log(this.a + this.b);
  },
};

setTimeout(obj1.calc, 2000);

//bindでthisを束縛
function hello(greeting) {
  console.log(greeting + this.name);
}

const katou = {
  name: "加藤",
  hello: function () {
    console.log("こんにちわ" + this.name);
  },
};

const helloKato = hello.bind(katou, "こんにちわ");

setTimeout(function () {
  katou.hello();
}, 1000);

//callメソッド

const ito = {
  name: "伊藤",
};

function hello(greeting) {
  console.log(greeting + this.name);
}

hello.call(ito, "こんばんわ");

const yamamoto = {
  name: "山本",
};

function hello(greeting, name) {
  console.log(`${greeting} ${name}`);
}

hello.apply(null, ["こんにちわ", "山下"]);

const vals = [1, 2, 3];

console.log(Math.max.apply(null, vals));
