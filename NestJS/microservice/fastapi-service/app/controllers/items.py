from fastapi import APIRouter, HTTPException
from typing import List
from app.services.items import get_items, get_item
from app.models.item import Item

router = APIRouter()

@router.get("/", response_model=List[Item])
def read_items():
    return get_items()

@router.get("/{item_id}", response_model=Item)
def read_item(item_id: int):
    item = get_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item



