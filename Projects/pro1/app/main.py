# app/main.py

from fastapi import FastAPI, HTTPException
import redis
import os

app = FastAPI()

# Redis接続設定
REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_DB = int(os.getenv("REDIS_DB", 0))

r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB, decode_responses=True)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI with Redis!"}

@app.get("/set/{key}/{value}")
def name_set(sei:str, mei:str):
    try:
        r.set(sei,mei)
        return{"message": f"Set {sei} , {mei}"}
    except Exception as e:
        raise HTTPException(status_code = 500, detail=str(e))
    
@app.get("/get/{sei}")
def get_sei(sei:str):
    try:
        mei = r.get(sei)
        if mei is None:
            raise HTTPException(status_code = 404, detail="Sei not found")
        return {"message": f"your name is {sei} {mei}"}
    except Exception as e:
        raise HTTPException(status_code = 500, detail = str(e))
    
@app.get("/lpush/{key}/{value}")
def lpush(key:str, value:str):
    try:
        r.lpush(key,value)
        return {"message":f"先頭に key: {key}, value: {value}を追加しました。"}
    except Exception as e:
        raise HTTPException(status_code = 500, detail = str(e))
    

def rpush(key:str, value:str):
    try:
        r.rpush(key, value)
        return {"message", f"最後尾に key: {key}, value: {value}を追加したよ。"}
    except Exception as e:
        raise HTTPException(status_code = 500, detail=str(e))
