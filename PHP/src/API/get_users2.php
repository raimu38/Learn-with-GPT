<?php

require './db02.php';

header(header: 'Content-Type: application/json');

//$_GET['id]はurlのパラメーターを取得するためのスーパーグローバル変数
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    //$pdo require ''で引き継がれている -> prepare()メソッドでSQLインジェクションを防ぐための記述
    $stmt = $pdo->prepare(query: 'SELECT * FROM users WHERE id = ?');
    $stmt->execute(params: [$id]);
    //SQLから結果を一件だけ取得する
    $user = $stmt->fetch();

    if ($user) {
        echo json_encode(value: $user);
    } else {
        echo json_encode(value: ['message' => 'User not found']);
    }
} else {
    $stmt = $pdo->query('SELECT * FROM users');
    $users = $stmt->fetchAll();
    echo json_encode(value: $users);
}
