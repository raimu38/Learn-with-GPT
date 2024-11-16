type User1 = {
  id: number;
  name: string;
  email: string;
  age: number;
};

let users: User1[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
];

const updateUser = (id: number, fieldsToUpdate: Partial<User1>): boolean => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...fieldsToUpdate };
    return true;
  }
  return false;
};

const updateUserOb = (id: number, fieldsToUpdate: Partial<User1>): boolean => {
  const user = users.find((user) => user.id === id);
  if (user) {
    Object.assign(user, fieldsToUpdate);
    return true;
  }
  return false;
};

updateUser(1, { name: "Alice Cooper" }); // nameだけを更新
updateUser(2, { email: "newbob@example.com", age: 32 }); // emailとageを更新
updateUser(3, { name: "Charlie" }); // idが存在しないため、falseを返す
