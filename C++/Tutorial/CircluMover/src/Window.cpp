#include "Window.hpp"
#include <iostream> // std::cerr など

Window::Window(const std::string& title, int width, int height)
    : m_title(title),
      m_width(width),
      m_height(height),
      m_isRunning(false),
      m_window(nullptr),
      m_renderer(nullptr),
      // ボールの初期値: ウィンドウ中心に配置し、半径30, 色は緑 (RGBA=0,255,0,255)
      m_ball(width / 2, height / 2, 30, SDL_Color{0, 255, 0, 255}),
      m_moveSpeed(5)
{
}

Window::~Window()
{
    // デストラクタ内でリソースをクリーンアップ
    cleanUp();
}

bool Window::init()
{
    // SDL_Init でSDLを初期化する
    // SDL_INIT_VIDEO は「ビデオサブシステムを使う」指定
    if (SDL_Init(SDL_INIT_VIDEO) < 0) {
        std::cerr << "SDL could not initialize! SDL_Error: "
                  << SDL_GetError() << std::endl;
        return false;
    }

    // SDL_CreateWindow でウィンドウを作成
    m_window = SDL_CreateWindow(
        m_title.c_str(),                // ウィンドウタイトル (string -> const char*)
        SDL_WINDOWPOS_CENTERED,         // ウィンドウを画面の中央に配置 (X座標)
        SDL_WINDOWPOS_CENTERED,         // ウィンドウを画面の中央に配置 (Y座標)
        m_width,                        // 幅
        m_height,                       // 高さ
        SDL_WINDOW_SHOWN                // ウィンドウをすぐに表示する
    );

    if (m_window == nullptr) {
        std::cerr << "Window could not be created! SDL_Error: "
                  << SDL_GetError() << std::endl;
        return false;
    }

    // SDL_CreateRenderer でレンダラーを作成
    m_renderer = SDL_CreateRenderer(
        m_window,      // 描画先のウィンドウ
        -1,            // ドライバの選択 (通常-1でOK)
        SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC
    );
    if (m_renderer == nullptr) {
        std::cerr << "Renderer could not be created! SDL_Error: "
                  << SDL_GetError() << std::endl;
        return false;
    }

    // ここまで来れたら初期化成功
    return true;
}

void Window::cleanUp()
{
    // レンダラーの破棄
    if (m_renderer) {
        SDL_DestroyRenderer(m_renderer);
        m_renderer = nullptr;
    }

    // ウィンドウの破棄
    if (m_window) {
        SDL_DestroyWindow(m_window);
        m_window = nullptr;
    }

    // SDL を終了 (最後に呼ぶ)
    SDL_Quit();
}

void Window::run()
{
    // 初期化に成功したらフラグを立てる
    if (init()) {
        m_isRunning = true;
    } else {
        // 初期化に失敗したら走らせない
        m_isRunning = false;
        return;
    }

    // メインループ
    while (m_isRunning) {
        processEvents();
        render();
        // 必要なら update() メソッドなどでロジック更新を入れてもOK
    }
}

void Window::processEvents()
{
    SDL_Event e;

    // イベントループ
    while (SDL_PollEvent(&e)) {
        if (e.type == SDL_QUIT) {
            // ウィンドウの「×」が押されたなどで終了
            m_isRunning = false;
        }
        else if (e.type == SDL_MOUSEMOTION) {
            // マウスが動いたイベント
            // e.motion.x, e.motion.y にマウスカーソルの現在座標が入っている
            m_ball.setPosition(e.motion.x, e.motion.y);
        }
        else if (e.type == SDL_KEYDOWN) {
            // キーが押された
            m_keyState[e.key.keysym.sym] = true;
        }
        else if (e.type == SDL_KEYUP) {
            // キーが離された
            m_keyState[e.key.keysym.sym] = false;
        }
    }

    // キーの状態に基づいてボールを移動
    int dx = 0, dy = 0;
    if (m_keyState[SDLK_LEFT])  dx -= m_moveSpeed;
    if (m_keyState[SDLK_RIGHT]) dx += m_moveSpeed;
    if (m_keyState[SDLK_UP])    dy -= m_moveSpeed;
    if (m_keyState[SDLK_DOWN])  dy += m_moveSpeed;

    m_ball.move(dx, dy);
}

void Window::render()
{
    // 描画色を「黄色」に設定して画面をクリア
    SDL_SetRenderDrawColor(m_renderer, 255, 255, 0, 255); // RGB: 255,255,0 は黄色
    SDL_RenderClear(m_renderer);

    // ボールを描画
    m_ball.draw(m_renderer);

    // 描画内容を画面に反映
    SDL_RenderPresent(m_renderer);
}