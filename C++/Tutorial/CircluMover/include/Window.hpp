#ifndef WINDOW_HPP
#define WINDOW_HPP

#include <string>
#include <unordered_map> // 追加: キー状態管理のため
#include <SDL2/SDL.h>
#include "Ball.hpp"

/**
 * @brief SDL2 を使ってウィンドウを管理するクラス
 *
 * このクラスはウィンドウの生成から、イベントループ（マウス入力など）の処理、
 * 描画を行うところまで一連を司ります。
 * main関数から呼び出して使います。
 */
class Window {
public:
    /**
     * @brief コンストラクタ
     * @param title ウィンドウのタイトル
     * @param width ウィンドウの幅
     * @param height ウィンドウの高さ
     */
    Window(const std::string& title, int width, int height);

    /**
     * @brief デストラクタ
     * SDL2のリソース破棄を行う
     */
    ~Window();

    /**
     * @brief メインループを開始する
     *
     * このメソッドを呼び出すと、ウィンドウが開き、
     * ユーザが閉じるまでループを続けます。
     */
    void run();

private:
    /**
     * @brief ウィンドウ・レンダラーを初期化
     * @return 成功なら true, 失敗なら false
     */
    bool init();

    /**
     * @brief イベントを処理する (例: マウス位置を取得など)
     */
    void processEvents();

    /**
     * @brief 描画を行う
     */
    void render();

    /**
     * @brief ウィンドウやレンダラーなどのクリーンアップ
     */
    void cleanUp();

private:
    // キー状態を管理するマップ
    std::unordered_map<SDL_Keycode, bool> m_keyState;

    std::string m_title;   // ウィンドウタイトル
    int m_width;           // 幅
    int m_height;          // 高さ
    bool m_isRunning;      // メインループが動いているかどうか

    SDL_Window* m_window;        // SDL ウィンドウ
    SDL_Renderer* m_renderer;    // SDL レンダラー

    Ball m_ball; // 画面上に表示するボール（1つだけ表示）
    int m_moveSpeed;
};

#endif