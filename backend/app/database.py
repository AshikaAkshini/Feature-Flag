from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://postgres:1234@localhost:5432/flagsystem"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# Database Connection Test
try:
    connection = engine.connect()
    print("✅ PostgreSQL Connected Successfully!")
    connection.close()
except Exception as e:
    print("❌ Connection Failed:", e)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()