<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// POSTリクエストの入力データを取得
$inputData = json_decode(file_get_contents('php://input'), true);

if (isset($inputData['name'])) {
    // JSONファイルから現在のユーザー情報を取得
    $data = file_get_contents('user.json');
    $users = json_decode($data, true);

    // 新しいユーザーIDを生成
    $newId = uniqid();
    $users[$newId] = ['id' => $newId, 'name' => $inputData['name']];

    // JSONファイルにユーザー情報を保存
    file_put_contents('user.json', json_encode($users));

    // ヘッダーを設定し、成功メッセージを返す
    header('Content-Type: application/json');
    echo json_encode(['message' => 'User created', 'id' => $newId]);
} else {
    // 入力が不正な場合のエラーメッセージを返す
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Invalid input']);
}
