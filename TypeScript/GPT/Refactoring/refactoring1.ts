type User = {
  name: string;
  age: number;
  email: string;
};

type Users = User[];

const userList: Users = [
  { name: "Alice", age: 25, email: "alice@example.com" },
  { name: "Bob", age: 30, email: "bob@example.com" },
  { name: "Charlie", age: 35, email: "charlie@example.com" },
];

const userOperations = {
  getUserNames: (users: Users): string[] => {
    return users.map((user) => user.name);
  },

  getTotalAge: (users: Users): number => {
    return users.reduce((total, user) => total + user.age, 0);
  },

  findUserByEmail: (users: Users, email: string): User | undefined => {
    return users.find((user) => user.email === email);
  },

  addUser: (users: Users, newUser: User): Users => {
    if (users.find((user) => user.email === newUser.email)) {
      console.log("Error : User with this email already exists.");
      return users;
    } else {
      return [...users, newUser];
    }
  },

  getUserAboveAge: (users: Users, age: number): Users | undefined => {
    return users.filter((user) => user.age > age);
  },
};

console.log(userOperations.getUserNames(userList));
console.log(userOperations.getTotalAge(userList));
console.log(userOperations.findUserByEmail(userList, "bob@example.com"));
console.log(userOperations.addUser(userList, { name: "Dave", age: 40, email: "dave@example.com" }));
console.log(userOperations.getUserAboveAge(userList, 25));
