#include "Window.hpp"

/**
 * @brief エントリーポイント (main関数)
 *
 * ここから実行が始まります。
 */
int main(int argc, char* argv[])
{
    // ウィンドウタイトル、幅、高さを指定して Window を生成
    Window window("Move the Ball with Mouse and Keyboard", 800, 600);

    // メインループを実行（ウィンドウを開いて待機）
    window.run();

    // アプリ終了
    return 0;
}