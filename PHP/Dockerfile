# ベースイメージとしてPHP 8を指定
FROM php:8.1-apache

# 作業ディレクトリを指定
WORKDIR /var/www/html

# 必要な拡張機能をインストール（例: PDO MySQL）
RUN docker-php-ext-install pdo_mysql

# 権限を変更してホストのファイルを使用できるように
RUN chown -R www-data:www-data /var/www/html