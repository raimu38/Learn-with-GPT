export const test = () => {
  const name: string = "raimu";
  const parts: string[] = [];
  const gender: "man" | "woman" = "man";
  const values: string | number = "thankyo";
  const notDefifined: undefined = undefined;
};

type User = {
  id: number;
  name: string;
  email?: string; // email は省略されてるかも
};

const users: User[] = [
  { id: 1, name: "Raimu", email: "raimu@example.com" },
  { id: 2, name: "Taro" },
  { id: 3, name: "Mika", email: "mika@example.com" },
  { id: 4, name: "Yuki" },
];

const checkMail = (users: User[]): User[] => {
  const hasEmailUsers = users.filter((user) => user.email !== undefined);
  console.log(hasEmailUsers);
  return hasEmailUsers;
};

checkMail(users);

type Address = {
  city: string;
  zip?: string;
};

type UserA = {
  id: number;
  name: string;
  address?: Address; //  It is same mean between ? &  ** | undefined
};

const userAs: UserA[] = [
  { id: 1, name: "Raimu", address: { city: "Tokyo", zip: "123-4567" } },
  { id: 2, name: "Taro" },
  { id: 3, name: "Mika", address: { city: "Osaka" } },
];

const checkAddressZip = (users: UserA[]): UserA[] => {
  const hasAddressZipUsers = users.filter(
    (user): user is Required<UserA> => user.address?.zip !== undefined
  );
  console.log(hasAddressZipUsers);
  return hasAddressZipUsers;
};

checkAddressZip(userAs);

class UserC {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getProfile(): string {
    return `${this.name} (${this.age})`;
  }
}

const userc = new UserC("nogi", 34);
console.log(userc.getProfile());

class AdminUser extends UserC {
  adminLevel: number;

  constructor(name: string, age: number, adminLevel: number) {
    super(name, age);
    this.adminLevel = adminLevel;
  }

  getProfile(): string {
    return `${this.name} (${this.age}) [Admin: ${this.adminLevel}]`;
  }
}

const adminUser = new AdminUser("nogii", 21, 40);

console.log(adminUser.getProfile());

class Product {
  name: string;
  private _price: number = 0;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  get price(): number {
    return this._price;
  }

  set price(val: number) {
    if (val < 0) throw new Error("負の値は禁止されている");
    this._price = val;
  }

  getInfo(): string {
    return `商品名:${this.name}, 価格:${this._price}`;
  }
}

const macBook = new Product("MacBook", 18000);
console.log(macBook.getInfo());

macBook.price = 50000;
console.log(macBook.getInfo());
