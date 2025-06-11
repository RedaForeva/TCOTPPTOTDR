from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
import uvicorn

# Настройка базы данных
DATABASE_URL = "sqlite:///'тут путь к базе данных'"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Определение модели для таблицы top_pincode
class TopPincode(Base):
    __tablename__ = "top_pincode"

    id = Column(Integer, primary_key=True, index=True)
    pincodes = Column(String)

# Определение Pydantic модели для сериализации
class TopPincodeResponse(BaseModel):
    id: int
    pincodes: str

    class Config:
        orm_mode = True  # Позволяет Pydantic работать с SQLAlchemy моделями

# Создание FastAPI приложения
app = FastAPI()

@app.get("/")
def hello_index():
    return {"message": "Hello index!"}

@app.get("/pincodes/", response_model=list[TopPincodeResponse])
def read_pincodes():
    db: Session = SessionLocal()
    try:
        pincodes = db.query(TopPincode).all()  # Извлечение всех записей из таблицы top_pincode
        if not pincodes:
            raise HTTPException(status_code=404, detail="No pincodes found")
        return pincodes  # FastAPI автоматически преобразует в JSON
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

if __name__ == '__main__':
    uvicorn.run("main:app", reload=True)
