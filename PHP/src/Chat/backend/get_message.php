<?php
// $data = file_get_contents('../data/chat.json');
$data = file_get_contents('/home/users/1/deci.jp-raimu/web/Data/Chat01/chat.json');
$message = json_decode(gzdecode($data), true);
echo json_encode($message);
