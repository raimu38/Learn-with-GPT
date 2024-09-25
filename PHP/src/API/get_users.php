<?php
// データベース接続ファイルを読み込む
require 'db01.php';

// ヘッダー設定（JSON形式で返すことを指定）
header('Content-Type: application/json');

// GETリクエストで特定のユーザーを取得する（例: /get_users.php?id=1）
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
    $stmt->execute([$id]);
    $user = $stmt->fetch();

    if ($user) {
        echo json_encode($user);
    } else {
        echo json_encode(['message' => 'User not found']);
    }
}
// すべてのユーザーを取得する
else {
    $stmt = $pdo->query('SELECT * FROM users');
    $users = $stmt->fetchAll();
    echo json_encode($users);
}
