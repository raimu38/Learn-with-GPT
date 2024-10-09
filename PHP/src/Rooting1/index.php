<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
header('Content-Type: application/json');
// ルーティング
if ($requestMethod == 'GET') {
    if (strpos($requestUri, '/users') !== false) {
        if (isset($_GET['id'])) {
            // 特定ユーザーの取得
            include 'get_user.php';
        } else {
            // 全ユーザーの取得
            include 'get_users.php';
        }
    }
} elseif ($requestMethod == 'POST') {
    // ユーザー作成
    include 'create_user.php';
} elseif ($requestMethod == 'PUT') {
    // ユーザー更新
    include 'update_user.php';
} elseif ($requestMethod == 'DELETE') {
    // ユーザー削除
    include 'delete_user.php';
} else {
    echo json_encode(['message' => 'Method not supported']);
}
