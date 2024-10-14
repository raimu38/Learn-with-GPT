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
