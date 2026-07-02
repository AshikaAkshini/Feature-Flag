from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:1234@localhost:5432/flagsystem"

engine = create_engine(DATABASE_URL)

try:
    connection = engine.connect()
    print("✅ PostgreSQL Connected Successfully!")
    connection.close()
except Exception as e:
    print("❌ Connection Failed:", e)