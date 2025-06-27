from fastapi import FastAPI
from fastapi.middleware.cors  import CORSMiddleware
from app.controllers import items

app = FastAPI()
app.include_router(items.router, prefix="/items", tags=["items"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/api/data")
def get_data():
    return {"message": "Hello from FastAPI"}

