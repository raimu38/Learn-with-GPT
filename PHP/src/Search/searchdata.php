<?php
$jsonFilePath = './class.json';

// ファイルが存在するか確認
if (file_exists($jsonFilePath)) {
    // JSONファイルを読み込む
    $jsonData = file_get_contents($jsonFilePath);

    // JSONデータを配列に変換
    $classData = json_decode($jsonData, true);
} else {
    echo "ファイルが見つかりません。";
    exit;
}
