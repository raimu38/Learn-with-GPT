#include "Ball.hpp"
#include <cmath> // 距離計算などに使う

Ball::Ball(int x, int y, int radius, SDL_Color color)
    : m_x(x), m_y(y), m_radius(radius), m_color(color)
{
    // コンストラクタでは単純にメンバ変数を初期化しているだけです。
    // オブジェクト指向の考え方として、
    // 「ボール」という概念に必要な情報(座標、色、半径)を
    // インスタンス変数として保持するように設計しました。
}

void Ball::draw(SDL_Renderer* renderer) const
{
    // 描画色を設定
    SDL_SetRenderDrawColor(renderer, m_color.r, m_color.g, m_color.b, m_color.a);

    // シンプルな「塗りつぶし円」を描画する例として、下記のように
    // ボールを囲む正方形を走査して、半径内にあるピクセルだけを描画
    // (distance <= m_radius) の条件で実現しています。
    //
    // 本来はもっと効率的な円描画アルゴリズム(Bresenhamの円など)がありますが、
    // わかりやすさ重視で「走査線＋距離計算」で実装。
    //
    // ※ 実行速度に厳しいアプリでは非推奨ですが、小さなサンプルならOKです。
    for (int w = 0; w < 2 * m_radius; ++w) {
        for (int h = 0; h < 2 * m_radius; ++h) {
            // 円の左上を (m_x - m_radius, m_y - m_radius) とみなし、
            // そこから (w, h) だけ進んだ点の座標を計算する
            int px = m_x - m_radius + w;
            int py = m_y - m_radius + h;

            // ボール中心 (m_x, m_y) からの距離を計算し、
            // 半径以下であれば「円の内側」とみなす
            int dx = px - m_x;
            int dy = py - m_y;
            if ((dx * dx + dy * dy) <= (m_radius * m_radius)) {
                SDL_RenderDrawPoint(renderer, px, py);
            }
        }
    }
}

void Ball::setPosition(int x, int y)
{
    m_x = x;
    m_y = y;
}

void Ball::move(int dx, int dy)
{
    m_x += dx;
    m_y += dy;
}

int Ball::getX() const
{
    return m_x;
}

int Ball::getY() const
{
    return m_y;
}

int Ball::getRadius() const
{
    return m_radius;
}