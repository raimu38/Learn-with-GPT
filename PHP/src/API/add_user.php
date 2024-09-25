<?php
// データベース接続ファイルを読み込む
require 'db01.php';

// ヘッダー設定（JSON形式で返すことを指定）
header('Content-Type: application/json');

// POSTリクエストを処理
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // POSTされたデータを取得
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['name']) && isset($data['email'])) {
        // データベースに新しいユーザーを追加
        $stmt = $pdo->prepare('INSERT INTO users (name, email) VALUES (?, ?)');
        $stmt->execute([$data['name'], $data['email']]);

        // 成功メッセージを返す
        echo json_encode(['message' => 'User added successfully']);
    } else {
        // エラーメッセージを返す
        echo json_encode(['message' => 'Invalid data']);
    }
}
