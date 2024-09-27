<?php
require_once './searchdata.php';
?>

<!DOCTYPE html>
<html lang="en">


<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>授業検索システム</title>
</head>

<body>
    <h1>授業検索システム</h1>

    <ul>
        <?php foreach ($classData as $class): ?>
            <li>
                <!-- 授業科目名をリンクにして、classidをクエリパラメータとして渡す -->
                <a href="class_detail.php?classid=<?= urlencode($class['classid']) ?>">
                    <?= htmlspecialchars($class['授業科目名'], ENT_QUOTES, 'UTF-8') ?>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
</body>

</html>