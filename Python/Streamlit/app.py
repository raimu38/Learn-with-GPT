# app.py

import streamlit as st
from PIL import Image, ImageEnhance
import numpy as np
import os

# アプリのタイトル
st.title("Dockerで動く画像表示アプリ")

st.write("---")

# サイドバーに説明
st.sidebar.header("アプリの説明")
st.sidebar.markdown("""
このアプリは、画像を読み込んで表示し、
スライダーで画像の透明度を調整できます。

Dockerコンテナ内で動作しています！
""")

# 画像ファイルのパス
# Dockerコンテナ内で実行されるため、コンテナ内のパスを指定
IMAGE_PATH = "/app/sample_image.jpg" # 後でこのファイル名を合わせます

# 画像ファイルが存在するかチェック
if os.path.exists(IMAGE_PATH):
    # 画像を読み込む
    original_image = Image.open(IMAGE_PATH)

    st.header("元の画像")
    st.image(original_image, caption="読み込んだ画像", use_column_width=True)

    st.write("---")

    # スライダーで透明度を調整
    st.header("透明度を調整")
    alpha = st.slider("透明度 (0.0: 透明 〜 1.0: 不透明)", 0.0, 1.0, 1.0)

    # 画像の透明度を調整する関数
    def adjust_alpha(image, alpha_value):
        img_array = np.array(image.convert("RGBA"))
        # アルファチャンネルを調整
        img_array[:, :, 3] = (img_array[:, :, 3] * alpha_value).astype(np.uint8)
        return Image.fromarray(img_array, "RGBA")

    # 透明度を調整した画像を表示
    if alpha < 1.0:
        adjusted_image = adjust_alpha(original_image, alpha)
        st.image(adjusted_image, caption=f"調整後の画像 (透明度: {alpha:.2f})", use_column_width=True)
    else:
        st.write("透明度の調整は行われていません（元の画像と同じです）。")

else:
    st.error(f"エラー: 画像ファイルが見つかりません。パスを確認してください: {IMAGE_PATH}")
    st.write("`sample_image.jpg` という名前で画像ファイルを `my_streamlit_app` フォルダ内に置いてください。")

st.write("---")
st.markdown("Developed with Streamlit and Docker.")
