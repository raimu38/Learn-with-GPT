def test_read_items(client):
    response = client.get("/items/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 2

def test_read_item_success(client):
    response = client.get("/items/1")
    assert response.status_code == 200
    item = response.json()
    assert item["id"] == 1
    assert item["name"] == "Apple"

def test_read_item_not_found(client):
    response = client.get("/items/999")
    assert response.status_code == 404
