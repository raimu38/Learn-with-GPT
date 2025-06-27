from typing import List, Optional
from app.models.item import Item

_fake_db =[
        Item(id=1, name="Apple", price=530),
        Item(id=2, name="Banana", price=300),
]

def fetch_all() -> List[Item]:
    return _fake_db

def fetch_by_id(item_id: int) -> Optional[Item]:
    return next(( item for item in _fake_db if item.id == item_id),None)

