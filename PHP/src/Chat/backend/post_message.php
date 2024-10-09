<?php
$inputData = json_decode(file_get_contents('php://input'), true); //POSTのときは

//ここからユーザーのデータを処理していく
if (isset($inputData['user_id']) && !empty($inputData['content'])) {
    $data = file_get_contents('/home/users/1/deci.jp-raimu/web/Data/Chat01/chat.json');
    $messages = json_decode(gzdecode($data), true);

    $newMessage = [
        'user_name' => $inputData['user_name'],
        'user_id' => $inputData['user_id'],
        'content' => $inputData['content'],
        'timestamp' => time(),

    ];

    $messages[] = $newMessage;

    //JSON_UNESCAPED_UNICODE 日本語のまま保存 JSON_PRETTY_PRINT 可読性が高くなるよう開業する。BUTデータ量が増す
    $jsonOptions = JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT;
    //LOCK_EXでファイルの破損を防ぐ JSON_PRETYE_PRINTで
    file_put_contents('/home/users/1/deci.jp-raimu/web/Data/Chat01/chat.json', gzencode(json_encode($messages, $jsonOptions)), LOCK_EX);

    echo json_encode(['message' => 'Successfully']);
} else {
    echo json_encode(['message' => 'Message not found']);
}
