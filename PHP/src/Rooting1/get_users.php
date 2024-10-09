<?php
// JSONファイルから全ユーザーを取得
$data = file_get_contents('user.json');
$users = json_decode($data, true);

if ($users) {
    echo json_encode($users);
} else {
    echo json_encode(['message' => 'No users found']);
}
