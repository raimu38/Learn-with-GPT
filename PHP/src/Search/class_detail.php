<?php
// JSONファイルを読み込み
require_once './searchdata.php'; // 同じJSON読み込みスクリプトを再利用

// クエリパラメータからclassidを取得
if (isset($_GET['classid'])) {
    $classid = $_GET['classid'];

    // 授業情報を検索
    $foundClass = null;
    foreach ($classData as $class) {
        if ($class['classid'] === $classid) {
            $foundClass = $class;
            break;
        }
    }

    // 授業情報が見つかった場合
    if ($foundClass) {
?>
        <!DOCTYPE html>
        <html lang="ja">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>授業詳細</title>

            <!-- BootstrapのCSSをCDNから読み込み -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">

            <!-- 独自のスタイルを追加することも可能 -->
            <style>
                body {
                    background-color: #f8f9fa;
                    font-family: Arial, sans-serif;
                }

                .container {
                    margin-top: 50px;
                }

                h1 {
                    color: #343a40;
                }

                .card {
                    margin-bottom: 20px;
                }
            </style>
        </head>

        <body>
            <div class="container">
                <div class="card">
                    <div class="card-header">
                        <h1>授業詳細情報</h1>
                    </div>
                    <div class="card-body">
                        <p><strong>授業科目名:</strong> <?= htmlspecialchars($foundClass['授業科目名'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>開講年度:</strong> <?= htmlspecialchars($foundClass['開講年度'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>担当教員:</strong> <?= htmlspecialchars($foundClass['担当教員'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>科目開講学部・学科:</strong> <?= htmlspecialchars($foundClass['科目開講学部・学科'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>科目区分:</strong> <?= htmlspecialchars($foundClass['科目区分'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>対象学年:</strong> <?= htmlspecialchars($foundClass['対象学年'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>開講学期・時間割・教室:</strong> <?= htmlspecialchars($foundClass['開講学期・時間割・教室'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>授業の形態:</strong> <?= htmlspecialchars($foundClass['授業の形態'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>単位:</strong> <?= htmlspecialchars($foundClass['単位'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>履修コード:</strong> <?= htmlspecialchars($foundClass['履修コード'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>シラバスURL:</strong> <a href="<?= htmlspecialchars($foundClass['シラバスURL'], ENT_QUOTES, 'UTF-8') ?>" target="_blank">シラバスリンク</a></p>
                        <p><strong>授業概要:</strong> <?= htmlspecialchars($foundClass['授業概要'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>到達すべき目標:</strong> <?= htmlspecialchars($foundClass['到達すべき目標'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>授業計画と準備学習:</strong> <?= htmlspecialchars($foundClass['授業計画と準備学習'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>授業の特色:</strong> <?= htmlspecialchars($foundClass['授業の特色'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>使用言語:</strong> <?= htmlspecialchars($foundClass['使用言語'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>成績評価の方法:</strong> <?= htmlspecialchars($foundClass['成績評価の方法'], ENT_QUOTES, 'UTF-8') ?></p>
                        <p><strong>参考文献:</strong> <?= htmlspecialchars($foundClass['参考文献'], ENT_QUOTES, 'UTF-8') ?></p>
                    </div>
                </div>
            </div>

            <!-- BootstrapのJSと依存するPopper.jsをCDNから読み込み -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
        </body>

        </html>
<?php
    } else {
        echo "授業情報が見つかりません。";
    }
} else {
    echo "クラスIDが指定されていません。";
}
