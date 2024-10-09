var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var userList = [
    { name: "Alice", age: 25, email: "alice@example.com" },
    { name: "Bob", age: 30, email: "bob@example.com" },
    { name: "Charlie", age: 35, email: "charlie@example.com" },
];
var userOperations = {
    getUserNames: function (users) {
        return users.map(function (user) { return user.name; });
    },
    getTotalAge: function (users) {
        return users.reduce(function (total, user) { return total + user.age; }, 0);
    },
    findUserByEmail: function (users, email) {
        return users.find(function (user) { return user.email === email; });
    },
    addUser: function (users, newUser) {
        if (users.find(function (user) { return user.email === newUser.email; })) {
            console.log("Error : User with this email already exists.");
            return users;
        }
        else {
            return __spreadArray(__spreadArray([], users, true), [newUser], false);
        }
    },
    getUserAboveAge: function (users, age) {
        return users.filter(function (user) { return user.age > age; });
    },
};
console.log(userOperations.getUserNames(userList));
console.log(userOperations.getTotalAge(userList));
console.log(userOperations.findUserByEmail(userList, "bob@example.com"));
console.log(userOperations.addUser(userList, { name: "Dave", age: 40, email: "dave@example.com" }));
console.log(userOperations.getUserAboveAge(userList, 25));
