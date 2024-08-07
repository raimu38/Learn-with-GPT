//ユーザーのオブジェクトをコンソールで表示してください

const user1 = {name: "watanabe", age:27, isMen: true}
const user2 = {name: "suzuki", age:25, isMen: false}

console.log({user1, user2})
//tableを使うと見やすい
console.table([user1,user2])


// オブジェクトのプロパティを関数の引数として分割代入を使用してください
const user = { name: "watanabe", age: 27, isMen: true }

// watanabe is 27 years oldと表示する

function feed(user){
console.log(`${user.name} is ${user.age}years old`)
}

function feed1(user){
    const{name, age} = user;
    console.log(`${name} is ${age} years old`)
}

function feedsneer({name, age}){
    console.log(`${name} is ${age} years old`)
}
feed(user)
feed1(user)
feedsneer(user)
