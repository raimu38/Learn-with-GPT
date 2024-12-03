class DatabaseConnection:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseConnection, cls).__new__(cls)
            cls._instance.connection = "データベース接続完了"
        
        return cls._instance

    def query(self, sql: str):
        print(f"クエリ実行: {sql}")

db1 = DatabaseConnection()
db2 = DatabaseConnection()

print(db1.connection)
print(db2.connection)

db1.query("SELECT * FROM users")

print(db1 is db2)

