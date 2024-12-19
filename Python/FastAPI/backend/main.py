from fastapi import FastAPI, Query
from typing import Annotated
from pydantic import BaseModel
from typing import Union

app = FastAPI()

@app.get('/')
def read_root():
    return {"message": "サプーAPIです"}

@app.get("/items/{item_id}/detail")
def read_item(item_id):
    return {"item_id": item_id, "item_name":"Tshirt"}

items = ["A","B","C","D","E"]

@app.get("/items")
def read_items(skip: int = 0, limit: Annotated[int, Query(ge=1, le=10)] = 10):
    return {"items":items[skip: skip+limit]}


class Item(BaseModel):
    name: str
    price: float
    description: Union[str, None] = None

@app.post("/items/")
def create_item(item:Item):
    print(f"データを登録します。{item.name}, {item.price},{item.description}")
    return item



from typing import Annotated
def calculate_area(radius: Annotated[float, "半径を指定してください"]) -> float:
    return 3.14 * radius ** 2

from fastapi import Query
def get_items(limit: int = Query(default=10, ge=1, le=10)):
    return limit
