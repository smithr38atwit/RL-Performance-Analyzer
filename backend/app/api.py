from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uuid import UUID
import requests
import os
from dotenv import load_dotenv
from app.model import FilteredReplays, DetailedReplay, Stats

app = FastAPI()
bc_url = "https://ballchasing.com/api/"
load_dotenv() # load environment variables from ".env"

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


@app.get('/') # Pings ballchasing api. Return true if ping was successful; otherwise, return false
async def read_root():
    headers = {"Authorization": os.getenv('TOKEN')}
    r = requests.get(bc_url, headers=headers) # Ping

    # If ping was unsuccessful, return false
    if (r.status_code != 200):
        return False
    else:
        return True

@app.get('/get_recent_replays/{player_name}') # Check if replays exists for a given player. Returns true if replay is found; otherwise, return false
async def get_recent_replays(player_name: str):
    headers = {'Authorization': os.getenv('TOKEN')}
    params = {'player-name': f'"{player_name}"', 'count': 1}
    r = requests.get(f'{bc_url}replays', params=params, headers=headers) # Filter replays
    if (r.status_code != 200):
        return False
    
    data = r.json()
    replays = FilteredReplays(**data)

    if (len(replays.list) == 0):
        return False
    
    replay_id = replays.list[0].id
    r = requests.get(f'{bc_url}replays/{replay_id}', headers=headers) # Get specific replay
    if (r.status_code != 200):
        return False
    
    data = r.json()
    replay = DetailedReplay(**data)

    return calculate_scores(replay)

def calculate_scores(data: DetailedReplay):
    stats = {'offense': 70, 'defense': 90, 'overall': 80}

    # TODO: put stat calculations here

    stats = Stats(**stats)
    return stats