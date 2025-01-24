from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
import strawberry
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware

# カスタムスカラー: MongoDBのObjectIdを文字列として扱う
@strawberry.type
class Item:
    id: str
    name: str
    description: Optional[str] = None

# GraphQLのクエリ定義
@strawberry.type
class Query:
    @strawberry.field
    async def hello(self) -> str:
        return "Hello, GraphQL with MongoDB!"

    @strawberry.field
    async def get_items(self) -> List[Item]:
        items = []
        async for item in Query.app.mongodb["items"].find():
            items.append(Item(
                id=str(item["_id"]),
                name=item["name"],
                description=item.get("description")
            ))
        return items

    @strawberry.field
    async def get_items_by_name(self, name: str) -> List[Item]:
        items = []
        async for item in Query.app.mongodb["items"].find({"name": name}):   
            items.append(Item(
                id=str(item["_id"]),
                name=item["name"],
                description=item.get("description")  # タイポ修正
            ))
        return items

    @strawberry.field
    async def get_items_by_description(self, description: str) -> List[Item]:
        items = []
        async for item in Query.app.mongodb["items"].find({"description": description}):  # コレクション名修正
            items.append(Item(
                id=str(item["_id"]),
                name=item["name"],
                description=item.get("description")
            ))
        return items

# GraphQLのミューテーション定義
@strawberry.type
class Mutation:
    @strawberry.mutation
    async def create_item(self, name: str, description: Optional[str] = None) -> Item:
        item = {"name": name, "description": description}
        result = await Mutation.app.mongodb["items"].insert_one(item)
        return Item(id=str(result.inserted_id), name=name, description=description)

    @strawberry.mutation
    async def update_item(self, id: str, name: Optional[str] = None, description: Optional[str] = None) -> Optional[Item]:
        update_data = {}
        if name is not None:
            update_data["name"] = name
        if description is not None:
            update_data["description"] = description

        if not update_data:
            return None

        result = await Mutation.app.mongodb["items"].find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": update_data},
            return_document=True
        )

        if result:
            return Item(id=str(result["_id"]), name=result["name"], description=result.get("description"))
        return None

    @strawberry.mutation
    async def delete_item(self, id: str) -> bool:
        result = await Mutation.app.mongodb["items"].delete_one({"_id": ObjectId(id)})
        return result.deleted_count == 1

# GraphQLスキーマの作成
schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)

# FastAPIアプリケーションの初期化
app = FastAPI()

# CORSの設定
origins = [
    "http://localhost",
    "http://localhost:3000",  # フロントエンドが別ポートの場合
    "http://127.0.0.1:5500",  # ローカルファイルからアクセスする場合
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 許可するオリジン
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# データベース接続のセットアップ
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient("mongodb://mongodb:27017")
    app.mongodb = app.mongodb_client["fastapi_graphql_db"]

    # クエリやミューテーションからデータベースにアクセスできるように設定
    Query.app = app
    Mutation.app = app

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

# GraphQLルーターの追加
app.include_router(graphql_app, prefix="/graphql")
