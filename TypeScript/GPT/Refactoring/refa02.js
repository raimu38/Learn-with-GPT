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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var todos = [];
var addTodo = function (title) {
    var newTodo = {
        id: todos.length + 1,
        title: title,
        completed: false,
    };
    todos = __spreadArray(__spreadArray([], todos, true), [newTodo], false); //スプレッド構文で要素を追加し　todosに代入して更新
    console.log("".concat(newTodo.title, " added."));
};
var completeTodo = function (id) {
    var todo = todos.find(function (todo) { return todo.id === id; });
    if (todo) {
        todo.completed = true;
        return true; //成功
    }
    return false; //失敗
};
var getIncompleteTodos = function () {
    return todos.filter(function (todo) { return !todo.completed; });
};
var updateTodo = function (id, fieldsToUpdate) {
    var todoIndex = todos.findIndex(function (todo) { return todo.id === id; });
    if (todoIndex !== -1) {
        todos[todoIndex] = __assign(__assign({}, todos[todoIndex]), fieldsToUpdate);
        return true;
    }
    return false;
};
// Usage example
addTodo("Learn TypeScript");
addTodo("Practice coding");
completeTodo(1);
console.log("Incomplete Todos:", getIncompleteTodos());
