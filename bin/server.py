from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
import uuid
import time

app = FastAPI(title="BookStore API", version="1.0.0")

# Security
security = HTTPBearer()

# Data models
class UserSignup(BaseModel):
    id: int
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Book(BaseModel):
    title: str
    author: str
    description: str
    price: float

class BookResponse(Book):
    id: int

class Message(BaseModel):
    message: str

class Detail(BaseModel):
    detail: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# In-memory storage
users = {}
books = {}
access_tokens = {}

# Mock data
mock_users = {
    "shiv@gmail.com": {"id": 1, "password": "shiv@123"},
    "devuser@gmail.com": {"id": 2, "password": "devpass"},
    "produser@gmail.com": {"id": 3, "password": "prodpass"}
}

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    if token not in access_tokens:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid access token"
        )
    return token

def verify_token_simple(token: str = Depends(security)):
    if token not in access_tokens:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid access token"
        )
    return token

# Use the simple verify_token function that works with HTTPBearer

@app.get("/health")
async def health_check():
    return {"status": "up"}

@app.post("/signup", response_model=Message)
async def signup(user: UserSignup):
    if user.email in users:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    users[user.email] = {
        "id": user.id,
        "password": user.password
    }
    
    return Message(message="User created successfully")

@app.post("/login", response_model=LoginResponse)
async def login(user: UserLogin):
    print(f"Login attempt for email: {user.email}")
    print(f"Mock users: {list(mock_users.keys())}")
    print(f"Created users: {list(users.keys())}")
    
    # Check mock users first
    if user.email in mock_users and mock_users[user.email]["password"] == user.password:
        print(f"Found in mock users: {user.email}")
        # Generate a simple token
        token = f"token_{int(time.time())}_{user.email}"
        access_tokens[token] = user.email
        return LoginResponse(access_token=token)
    
    # Check newly created users
    if user.email in users and users[user.email]["password"] == user.password:
        print(f"Found in created users: {user.email}")
        # Generate a simple token
        token = f"token_{int(time.time())}_{user.email}"
        access_tokens[token] = user.email
        return LoginResponse(access_token=token)
    
    print(f"User not found or password incorrect: {user.email}")
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials"
    )

@app.get("/books/", response_model=List[BookResponse])
async def get_all_books():
    return list(books.values())

@app.get("/books/{book_id}", response_model=BookResponse)
async def get_book(book_id: int):
    if book_id not in books:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found"
        )
    return books[book_id]

@app.post("/books/", response_model=BookResponse, status_code=status.HTTP_201_CREATED)
async def create_book(book: Book):
    book_id = len(books) + 1
    book_response = BookResponse(id=book_id, **book.model_dump())
    books[book_id] = book_response
    return book_response

@app.put("/books/{book_id}", response_model=BookResponse)
async def update_book(book_id: int, book: Book):
    if book_id not in books:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found"
        )
    
    book_response = BookResponse(id=book_id, **book.model_dump())
    books[book_id] = book_response
    return book_response

@app.delete("/books/{book_id}")
async def delete_book(book_id: int):
    if book_id not in books:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found"
        )
    
    del books[book_id]
    return {"message": "Book deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
