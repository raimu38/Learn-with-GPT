// // 演習1 (四則演算)
// const number_1 = 10;
// const number_2 = 3;
// const number_3 = 4;
// const number_4 = 10000;

// console.log(`${number_1} +${number_2} = ${number_1 + number_2} `);

// // 演習 2 (イテレーション)
// // 「for」を使って、数字の1 から 30 を出力するプログラムを作成しましょう。

// for (let i = 1; i <= 33; i++) {
//   console.log(i);
// }

// // 演習 3 (イテレーションと剰余)
// // 数字の1 から25 のうち、5 の倍数だけを出力するプログラムを作成しましょう。
// for (let i = 1; i <= 25; i++) {
//   if (i % 5 === 0) {
//     console.log(i);
//   }
// }

// // 演習4 (関数)
// // ある1 つの引数を取る関数を作って下さい。
// // 数字の1 から 25 のうち、引数の倍数だけを出力するプログラムを作成します。 ただし、引数が25 より大きい場合は、そのまま数字を出力して下さい。
// // 以下の出力になります。

// function modules(num) {
//   if (num > 25) {
//     console.log(num);
//   } else {
//     for (let i = 1; i <= 25; i++) {
//       if (i % num === 0) {
//         console.log(i);
//       }
//     }
//   }
// }

// modules(6);
// modules(49);

// // 演習5
// // (関数)
// // ある1 つの引数を取る関数を作って下さい。
// // 2 0 未 満 の 数 字 な ら ば 「N G 」、 2 0 以 上 の 数 字 な ら ば 「O K 」 と い う 文 字 列 を 返 し て 下 さ い 。
// // その戻り値を使って、「あなたの場合は、お酒は〇〇です」という文字列を出力して下さい。 関数の引数に20 を入れた場合は、以下の出力になります。

// function isAlcohole1(age) {
//   if (age < 20) {
//     return "NG";
//   } else {
//     return "OK";
//   }
// }

// function isAlcohole(age) {
//   return age < 20 ? "NG" : "OK";
// }

// let message = isAlcohole(21);
// console.log(`あなたの場合ははお酒は${message}です`);

// message = isAlcohole(10);
// console.log(`あなたの場合ははお酒は${message}です`);

// 演 習 6 (i f 文)
// ある1 つの引数を取る関数を作って下さい。
// そして、以下の条件に従って、値を出力して下さい。 ・対象の数字が、3 の倍数のとき「Fizz」
// ・対象の数字が、5 の倍数のとき「BuZZ」 ・対象の数字が、15 の倍数のとき「FizzBUZZ」 ・対象の数字が、それ以外の場合は、「Nothing」

// //if
// function is351(num) {
//   let num1 = 3;
//   let num2 = 5;
//   if (num % num1 === 0 && num % num2 === 0) {
//     return "FizzBUZZ";
//   } else if (num % num1 === 0) {
//     return "Fizz";
//   } else if (num % num2 === 0) {
//     return "BuZZ";
//   } else {
//     return "Nothing";
//   }
// }

// console.log(is35(30));
// console.log(is35(6));
// console.log(is35(50));
// console.log(is35(14));

// //terary
// function is351(num) {
//   //Ternary
//   return num % 15 === 0
//     ? "FizZBUZ"
//     : num % 3 === 0
//     ? "Fiz"
//     : num % 5 === 0
//     ? "BUZ"
//     : "Nothing";
// }

// //ObJect
// function is35(num) {
//   const result = {
//     0: "FizZBUZ",
//     3: "FIzZ",
//     5: "BUZ",
//   };

//   return (
//     result[num % 15 === 0 ? 0 : num % 3 === 0 ? 3 : num % 5 === 0 ? 5 : -1] ||
//     "Nothing"
//   );
// }

// // 演 習 7 (c a s e 文 )
// // ある1 つの引数を取る関数を作って下さい。
// // そして、以下の条件に従って、値を出力して下さい。 ・対象の数字が、3、4、5 のとき「春」
// // ・対象の数字が、6、7、8 のとき「夏」 ・対象の数字が、9、1 0、11 のとき「秋」
// // ・対象の数字が、12、1、2 のとき「冬」 ・対象の数字が、それ意外の場合は、「季節不明」
// // 関数の引数に3 や6 を入れた場合は、以下の出力になります。

// function seasonshow(month) {
//   switch (mont) {
//     case 3 || 4 || 5:
//       console.log("春");
//       break;
//     case 1 || 2 || 12:
//       console.log("冬");
//       break;
//     default:
//       console.log("季節不明");
//       s;
//   }
// }

// function seasonshow(mont) {
//   const seasons = {
//     3: "春",
//     4: "春",
//     5: "春",
//     6: "夏",
//     7: "夏",
//     8: "夏",
//     9: "秋",
//     10: "秋",
//     11: "秋",
//     12: "冬",
//     1: "冬",
//     2: "冬",
//   };

//   console.log(seasons[mont] || "季節不明");
// }

// seasonshow(4);
// seasonshow(6);
// seasonshow(10);
// seasonshow(1);

// 演習 10 (キャスト)
// ある 1つの引数を取る関数を作って下さい。
// そして、1以上の整数aを関数に渡したら、a+aaa を返すプログラムを作成してください。 関数の引数に値を入れた場合は、以下の出力になります。
// console.1og(cal(3));

function cal(num) {
  const aaa = parseInt(num.toString().repeat(3));
  return aaa + num;
}
console.log(cal(33));

// 演習 11 (絶対値)
function abs(num1, num2) {
  return Math.abs(num1 - num2);
}

console.log(abs(4, 6));

// 演習 12 (文字列
function strlength(string) {
  return string.length;
}

console.log(strlength("ffd"));

// 演習 13 (文字列の扱い 大文字 <=> 小文字
function aA(str) {
  return str === str.toUpperCase() ? str.toLowerCase() : str.toUpperCase();
}
console.log(aA("aaabbb"));
console.log(aA("AAABBB"));

let str1 = "applejeifjaoerlmfn,a";
let str2 = "bananaowiujhourc,zmlkvjld";

// 演習 14 (文字列と配列の変換)
function samearray(str1, str2) {
  common = [];
  for (let char of str1) {
    if (str2.includes(char) && !common.includes(char)) {
      common.push(char);
    }
  }
  return common;
}

console.log(samearray(str1, str2));

function commonCharacters(str1, str2) {
  const set1 = new Set(str1);
  const set2 = new Set(str2);

  const common = [...set1].filter((char) => set2.has(char));

  return common;
}

console.log(commonCharacters("feojawoenakmsepoerk", "fjpoewijfpeim"));
