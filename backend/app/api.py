from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv
from app.model import Ping

app = FastAPI()
bc_url = "https://ballchasing.com/api/"

# CORS(Cross Origin Resource Sharing) allows requests from the frontend
origins = [
    "http://localhost:3000", # origin when using React
    "http://127.0.0.1:5500" # origin when hosting with Live Server
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get('/') # Root endpoint (GET http://127.0.0.1:8000)
async def read_root():
    """ Pings the ballchasing API to check connection and token validity

    Returns: a Ping object
    """

    load_dotenv() # load environment variables from ".env"
    headers = {"Authorization": os.getenv('TOKEN')}
    r = requests.get(bc_url, headers=headers) # Ping

    data: dict = {"status_code" : r.status_code}
    if r.status_code != 200:
        data["error"] = r.json()["error"]
    ping = Ping(**data)

    return ping