<?php
$string = "WebDevelopment";

$stringreverse = strrev($string);

print($stringreverse);


$array01 = array(1, 2, 2, 3, 4, 4, 5, 5, 5);

$uniquearray01 = array_unique($array01);
print_r($uniquearray01);

$NowTime = new DateTime();
echo $NowTime->format('Y-m-d H:i:s\n');

$array02 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

$subArraySums = array_map('array_sum', $array02);
$array02Total = array_sum($subArraySums);


echo $array02Total;


$array = [
    [2, 3, 4],
    [5, 6],
    [7, 8, 9]
];


$subArrayMulti = array_reduce($array, function ($multi, $item) {
    $subMulti = array_reduce($item, function ($carry, $number) {
        return $carry * $number;
    }, 1);
    return $multi * $subMulti;
}, 1);

echo $subArrayMulti;



$text = "PHP is great and PHP is powerful. PHP is everywhere!";

// 1. 小文字に変換
$text = strtolower($text);

// 2. 文字列を単語に分割
$words = str_word_count($text, 1);

// 3. 単語の出現回数をカウント
$wordCounts = [];

foreach ($words as $word) {
    if (array_key_exists($word, $wordCounts)) {
        $wordCounts[$word]++;
    } else {
        $wordCounts[$word] = 1;
    }
}

// 4. 結果を出力
print_r($wordCounts);


$date1 = new DateTime("2024-10-15");
$date1->modify('+1 month');
print($date1->format('Y-m-d s:i:H'));

$nowTime1 = new DateTime('2024-10-15 14:30:00');
$nowTime1->modify('-1 hour -30 minutes');
echo ($nowTime1->format('Y-m-d H:i:s'));

$date3 = new DateTime('2024-10-15');
$date3->modify('+100 minutes');
echo $date3->format('Y-m-d H:i:s');


$array3 = [3, 5, 1, 9, 2, 8];
rsort($array3);
print_r($array3);



$fileName1 = '/Users/raimumiwa/Desktop/DEVELOP/GitHub/Learn-with-GPT/PHP/src/Builtin/data.txt';
$fileName1Array = file($fileName1); // ファイルの各行を配列として読み込む

// 配列を逆順に並べ替える
$fileName1reverse = array_reverse($fileName1Array);

// 新しいファイルに書き込む
file_put_contents('/Users/raimumiwa/Desktop/DEVELOP/GitHub/Learn-with-GPT/PHP/src/Builtin/reversed_data.txt', implode('', $fileName1reverse));


$array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

$evenNumbers = array_values(array_filter($array, function ($item) {
    return $item % 2 === 0;
}));

// print_r($evenNumbers);


$strHello = "Hello World, PHP is amazing!";

$strHelloIndex = strrpos($strHello, ',');
$strHellocomma = substr($strHello, $strHelloIndex + 1);
// print($strHellocomma);


$str = "Hello World, PHP is amazing!";

$strUpp = strtoupper($str);
$strRep = str_replace(' ', '_', $strUpp);
// echo $strRep;

$students = [
    ['name' => 'John', 'age' => 22],
    ['name' => 'Jane', 'age' => 26],
    ['name' => 'Mike', 'age' => 30],
    ['name' => 'Sara', 'age' => 24],
    ['name' => 'Paul', 'age' => 28]
];

$studentsage = array_values(array_filter($students, function ($student) {
    return $student['age'] >= 25;
}));

//詳細なデータを見たい
// var_dump($studentsage);
//jsonでみたい
// echo json_encode($studentsage);
//カスタマイズしたい foreach

$fileName1 = __DIR__ . '/data.txt';
$data = file_get_contents($fileName1);
$datalow = strtolower($data);
$fileName2 = __DIR__ . '/lowecase_data.txt';
file_put_contents($fileName2, $datalow);


$fruits = "apple,banana,orange,grape";
$fruitsArray  = explode(',', $fruits);
foreach ($fruitsArray as $fruit) {
    echo $fruit . "\n";
}

$date = new DateTime();
echo $date->format('Y-m-d H:i:s') . "\n";
$after3day = $date->modify('+3 day');
$before1month = $date->modify('-1 month');
echo $after3day->format('Y-m-d H:i:s') . "\n";
echo $before1month->format('Y-m-d H:i:s') . "\n";

$price = "The price of item A is $15.99, and the price of item B is $20.50.";

preg_match_all("/\\$\d+\.\d{2}/", $price, $priceArray);
print_r($priceArray[0]);


$emails =  "My email addresses are test123@example.com and hello.world@domain.co.jp.";

$hiddenmail = preg_replace("/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/", "[hidden email]", $emails);

echo $hiddenmail;

$date = "2024-10-15";

$dateReg = preg_replace("/(\d{4})-(\d{2})-(\d{2})/", "$3/$2/$1", $date);

echo $dateReg;


$numbers = [1, 2, 3, 4, 5];
array_walk($numbers, function (&$number) {
    $number *= 2;
});
print_r($numbers);
