<?php
// JSONファイルから特定のユーザーを取得
$data = file_get_contents('user.json');
$users = json_decode($data, true);
$userId = $_GET['id'];

if (isset($users[$userId])) {
    header('Content-Type: application/json');
    echo json_encode($users[$userId]);
} else {
    header('Content-Type: application/json');
    echo json_encode(['message' => 'User not found']);
}
