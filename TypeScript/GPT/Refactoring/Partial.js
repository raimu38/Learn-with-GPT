var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var users = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
];
var updateUser = function (id, fieldsToUpdate) {
    var userIndex = users.findIndex(function (user) { return user.id === id; });
    if (userIndex !== -1) {
        users[userIndex] = __assign(__assign({}, users[userIndex]), fieldsToUpdate);
        return true;
    }
    return false;
};
updateUser(1, { name: "Alice Cooper" }); // nameだけを更新
updateUser(2, { email: "newbob@example.com", age: 32 }); // emailとageを更新
updateUser(3, { name: "Charlie" }); // idが存在しないため、falseを返す
