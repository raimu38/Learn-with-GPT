#ifndef BALL_HPP
#define BALL_HPP

#include <SDL2/SDL.h> // SDL2 のメインヘッダをインクルード（描画に必要）
#include <string>

/**
 * @brief 画面上に表示する「ボール」を表すクラス
 *
 * このクラスはボールの位置・半径・色といった情報を持ち、
 * SDL_Renderer を用いて描画するメソッドを提供します。
 *
 * ボールの描画は「ピクセルを1つずつ塗りつぶす」方法で実装。
 * 小規模アプリならこれでも十分ですが、大きな円をたくさん描画するなら
 * もっと効率の良い方法を検討する必要があります。
 */
class Ball {
public:
    /**
     * @brief コンストラクタ
     * @param x ボールの中心 x 座標
     * @param y ボールの中心 y 座標
     * @param radius ボールの半径
     * @param color ボールの色 (SDL_Color 型)
     */
    Ball(int x, int y, int radius, SDL_Color color);

    /**
     * @brief ボールを描画する
     * @param renderer SDL_Renderer* 描画先のレンダラー
     */
    void draw(SDL_Renderer* renderer) const;

    /**
     * @brief ボールの中心座標を設定
     */
    void setPosition(int x, int y);
    /** 
    *@brief ボールを移動させる
    *@param dx x 方向の移動量
    *@param dy y 方向の移動量
    **/

    void move(int dx, int dy);

    /**
     * @brief ボールの中心座標を取得（x 座標）
     */
    int getX() const;

    /**
     * @brief ボールの中心座標を取得（y 座標）
     */
    int getY() const;

    /**
     * @brief ボールの半径を取得
     */
    int getRadius() const;

private:
    int m_x;         // ボールの中心 x 座標
    int m_y;         // ボールの中心 y 座標
    int m_radius;    // ボールの半径
    SDL_Color m_color; // SDL2 で色を表す構造体 (r, g, b, a)
};

#endif