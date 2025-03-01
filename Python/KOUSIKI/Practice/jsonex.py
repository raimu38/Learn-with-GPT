import json

def encode_complex(dct):
    if '__complex__' in dct:
        return complex(dct['real'], dct['img'])
    return dct

data = '{"__complex__": true, "real":3,"img":2}'
result = json.loads(data, object_hook=encode_complex)
print(result)
print(type(result))


data = '{"b": 2, "a": 1, "c": 3}'
result = json.loads(data)
print(result)

data = {"message": "こんにちわ"}
print(json.dumps(data))

print(json.dumps(data, ensure_ascii = False))


data= {"name":"Alice", "age": 3, "city":"京都"}
print(json.dumps(data))
print(json.dumps(data, indent=4, ensure_ascii=False,sort_keys=True))


import json

class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, complex):
            return {"real": obj.real, "imag": obj.imag}
        return super().default(obj)

data = 3 + 4j
json_data = json.dumps(data, cls=ComplexEncoder)

print(json_data)
