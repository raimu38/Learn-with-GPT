<?php
require 'db02.php';

header('Content-Type: applicatoin/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    //php://input は読み込み専用 true:連想配列として扱うかどうか or オブジェクト
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['name']) && isset($data['email'])) {
        $stmt = $pdo->prepare('INSERT INTO users (name, email) VALUE (?, ?)');
        $stmt->execute([$data['name'], $data['email']]);

        echo json_encode(['message' => 'User added successfully!']);
    } else {
        echo json_encode(['message' => 'Invalid data']);
    }
}
