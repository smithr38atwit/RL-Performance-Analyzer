from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv
from app.model import Ping

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:5500"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
async def read_root():
    load_dotenv()
    headers = {"Authorization": os.getenv('TOKEN')}
    r = requests.get("https://ballchasing.com/api/", headers=headers)

    data: dict = {"status_code" : r.status_code}
    if r.status_code != 200:
        data["error"] = r.json()["error"]
    ping = Ping(**data)

    return ping