class TestCls {
  method(arg) {
    console.log(`引数:${arg}でメソッドを実行`);
  }
}

const testcl = new TestCls();

testcl.method("ありがとう");

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  login() {
    console.log(`ログイン[${this.username}/${this.password}]`);
  }

  changePassword(pwd) {
    this.password = pwd;
    console.log(`パスワードが[${this.password}]に変更されました`);
  }
}

const taro = new User("伊藤太郎", "hirakegoma");

taro.login();

taro.changePassword("shimaremame");
taro.login();

class User1 {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  login() {
    console.log(`Login [${this.username}/${this.password}]`);
  }
}
const hitomi = new User1("Hitomi", "wotojite");
hitomi.login();

const hanako = new User1("Hanako", "hanadumari");
hanako.login();

class User2 {
  constructor(username, password, roll) {
    this.username = username;
    this.password = password;
    this.roll = roll;
  }

  login() {
    this.check();
    console.log(`ログイン[${this.username}/${this.password}]`);
  }

  check() {
    console.log("ログイン情報をチェックします");
  }

  checkRoll() {
    const userroll =
      this.roll === "admin" ? "管理者権限です" : "一般ユーザーです";
    console.log(userroll);
  }
}

const watabe = new User2("watabe", "tawabe", "admin");
watabe.checkRoll();

const cojima = new User2("kojima", "mojika", "hutu-");
cojima.checkRoll();

class Human {
  static TYPE = "普通の人";

  static staticMove() {
    console.log(Human.TYPE + "は歩いて移動します");
  }

  constructor(name) {
    this.name = name;
  }

  move() {
    console.log(this.name + "は歩いて移動します");
  }
}

const jiro = new Human("次郎");

Human.staticMove();

jiro.move();
