<?php
// ユーザーの削除
$inputData = json_decode(file_get_contents('php://input'), true);
if (isset($inputData['id'])) {
    $data = file_get_contents('user.json');
    $users = json_decode($data, true);

    $userId = $inputData['id'];
    if (isset($users[$userId])) {
        // ユーザーを削除
        unset($users[$userId]);
        file_put_contents('user.json', json_encode($users));
        echo json_encode(['message' => 'User deleted']);
    } else {
        echo json_encode(['message' => 'User not found']);
    }
} else {
    echo json_encode(['message' => 'Invalid input']);
}
