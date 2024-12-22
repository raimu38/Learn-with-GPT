from fastapi import FastAPI
from fastapi import File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import redis
import uuid
import os

app = FastAPI()

# CORS 設定 (フロントエンドからのアクセスを許可するため)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番環境では特定ドメインに絞ること
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redis に接続
r = redis.Redis(host="redis", port=6379, db=0)

# 画像ファイルの保存先フォルダ
MEDIA_FOLDER = "media"

@app.get('/api/')
def say_hello():
    return {"message": "hello"}
    
# 起動確認用
@app.get("/api/health")
def health_check():
    return {"status": "ok"}

# 画像アップロード
@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...), title: str = "untitled"):
    # ファイル拡張子チェック (任意で実装)
    filename = file.filename
    ext = os.path.splitext(filename)[1].lower()
    if ext not in [".jpg", ".jpeg", ".png", ".gif"]:
        raise HTTPException(status_code=400, detail="Invalid file format")

    # 一意のIDを生成
    img_id = str(uuid.uuid4())

    # ファイルを保存
    file_path = os.path.join(MEDIA_FOLDER, img_id + ext)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Redis にタイトルや拡張子を保存 (メタ情報)
    r.hset(img_id, mapping={"title": title, "ext": ext})

    return {"id": img_id, "title": title, "message": "File uploaded successfully"}

# 画像を取得 (バイナリ形式で返す)
@app.get("/api/image/{image_id}")
async def get_image(image_id: str):
    # Redis から ext を取得
    ext = r.hget(image_id, "ext")
    if not ext:
        raise HTTPException(status_code=404, detail="Image not found")
    ext = ext.decode("utf-8")

    file_path = os.path.join(MEDIA_FOLDER, image_id + ext)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    def file_iterator():
        with open(file_path, "rb") as f:
            yield from f

    # MIME タイプは簡易的に分岐
    if ext in [".jpg", ".jpeg"]:
        media_type = "image/jpeg"
    elif ext in [".png"]:
        media_type = "image/png"
    elif ext in [".gif"]:
        media_type = "image/gif"
    else:
        media_type = "application/octet-stream"

    return StreamingResponse(file_iterator(), media_type=media_type)

# 画像削除
@app.delete("/api/image/{image_id}")
async def delete_image(image_id: str):
    ext = r.hget(image_id, "ext")
    if not ext:
        raise HTTPException(status_code=404, detail="Image not found")
    ext = ext.decode("utf-8")

    file_path = os.path.join(MEDIA_FOLDER, image_id + ext)
    if os.path.exists(file_path):
        os.remove(file_path)

    # Redis からも削除
    r.delete(image_id)

    return {"message": "Image deleted successfully"}