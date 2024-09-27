<?php
// ユーザーの更新
$inputData = json_decode(file_get_contents('php://input'), true);
if (isset($inputData['id']) && isset($inputData['name'])) {
    $data = file_get_contents('user.json');
    $users = json_decode($data, true);

    $userId = $inputData['id'];
    if (isset($users[$userId])) {
        // ユーザーの名前を更新
        $users[$userId]['name'] = $inputData['name'];
        file_put_contents('user.json', json_encode($users));
        echo json_encode(['message' => 'User updated']);
    } else {
        echo json_encode(['message' => 'User not found']);
    }
} else {
    echo json_encode(['message' => 'Invalid input']);
}
