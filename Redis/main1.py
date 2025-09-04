import redis

r = redis.Redis(host="localhost", port=6379, db=0)
r.set("fruit", "appl")
val = r.get("fruit")
print(val)
