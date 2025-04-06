import redis
import json

def main():
    # 1) Connect to Redis
    r = redis.Redis(host='redis', port=6379, db=0, decode_responses=True)

    # 2) Load data from product.json
    with open('product.json', 'r') as f:
        sample_data = json.load(f)

    # 3) CREATE: insert each item as a Redis hash
    for item in sample_data:
        r.hset(item['id'], mapping=item)

    # 4) READ: fetch one item
    print("READ veg:01:", r.hgetall("veg:01"))

    # 5) UPDATE: change price
    r.hset("veg:01", "price", 130)
    print("UPDATED PRICE veg:01:", r.hget("veg:01", "price"))

    # 6) DELETE: remove one item
    r.delete("proc:01")
    print("EXISTS proc:01?", r.exists("proc:01"))

    # 7) EXPIRE: set TTL on perishable item
    r.expire("fish:01", 3600)  # 1 hour
    print("TTL fish:01:", r.ttl("fish:01"))

    # 8) SORTED SET: rank products by price
    for item in sample_data:
        r.zadd("products_by_price", {item['id']: item['price']})
    print("Top 3 cheapest:", r.zrange("products_by_price", 0, 2))

    # 9) PIPELINE: batch increment stock
    pipe = r.pipeline()
    for item in sample_data:
        pipe.hincrby(item['id'], "stock", 10)
    pipe.execute()
    print("Stock incremented for all items.")

    # 10) SETS: group IDs by type
    for item in sample_data:
        r.sadd(f"{item['type'].lower()}s", item['id'])
    print("Vegetable IDs set:", r.smembers("vegetables"))

if __name__ == "__main__":
    main()

