<?php
ini_set('display_error', 1);
ini_set('display_startup_error', 1);
error_reporting(E_ALL); //全部のエラーを表示開発段階では

header('Content-Type: application/json'); //クライアントにこのデータはJsonですよと伝える。

$requestMethod = $_SERVER['REQUEST_METHOD']; //クライアントからのリクエストのメソッド(GET,POST,PUT,DELETE)を取得 処理を分岐

if ($requestMethod == 'GET') {
    require 'get_message.php';
} else if ($requestMethod == 'POST') {
    require 'post_message.php';
} else {
    echo json_encode(['message' => 'Method not supported']); //json_encode PHP　をjson形式に変換 その中身は連想配列。　すべてJSON形式で統一するため。
}
