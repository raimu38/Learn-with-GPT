from typing import List, Optional
from app.repositories.items import fetch_all, fetch_by_id
from app.models.item import Item

def get_items() -> List[Item]:
    return fetch_all()

def get_item(item_id: int) -> Optional[Item]:
    return fetch_by_id(item_id)

