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


// 18歳以上ならI'm an adult at 27 years old
// 18歳未満ならI'm an young at 15 years old
const user = { name: "watanabe", age: 27, isMen: true }

const {age} = user
const ageStr = age > 18 ? "adult" :"young";
const bio = `I`m an ${ageStr} at ${age} years old`;
console.log(bio);
function hello({age}){
console.log(`I`m an ${age>=18 ? 'adult' : 'young'} at ${age} years old`)
}

functioin hello(user)




// 配列の各要素を操作し、合計値、税金を含む新しい配列、および100いじょうを満たす要素の配列を作成してください。
const orders = [500, 30, 99, 15, 223];

const 


