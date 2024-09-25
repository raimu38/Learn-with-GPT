<?php
$host = 'MYSQL-Learn';
$user = 'raimu';
$pass = 'raimusql';
$db = 'Mysql-Lean';
$charset = 'utf8mb4'; //utf8:最大3バイト utf8mb4 :　最大4バイト 絵文字が送れる
$port = 3306;

//$dsn:Data Source Name
$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

$option = [
    PDO::ATTR_ERRMODE       => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
    PDO::ATTR_TIMEOUT => 10,
];

try {
    $pdo = new PDO(dsn: $dsn, username: $user, password: $pass, options: $option);
} catch (\PDOException $e) {
    throw new \Exception(message: $e->getMessage(), code: $e->getCode());
}
