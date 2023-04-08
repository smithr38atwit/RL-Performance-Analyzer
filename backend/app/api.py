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

    # testing
    if player_name == 'a': return {'offense': 70, 'defense': 90, 'overall': 80}
    if player_name == 'b': return {'offense': 40, 'defense': 60, 'overall': 50}
    if player_name == 'c': return {'offense': 100, 'defense': 20, 'overall': 60}

    return calculate_scores(replay, player_name)

def calculate_scores(data: DetailedReplay, user: str):
    
    offensive = int(get_offensive_score(data, user))
    defensive = int(get_defensive_score(data, user))
    overall = ((offensive + defensive)/2) * 1.10
    
    stats = {'offense': offensive, 'defense': defensive, 'overall': overall}

    # TODO: put stat calculations here
    

    stats = Stats(**stats)
    return stats


def get_offensive_score(replay: DetailedReplay, player_name: str):
    bteam = replay.blue
    oteam = replay.orange

    b_players = bteam.players
    o_players = oteam.players

    player_sp = 0.0
    all_SP = []

    player_shots = 0.0
    all_shots = []

    player_assists = 0.0
    all_assists = []

    player_stolen = 0.0
    all_stolen = []

    player_off_half = 0.0
    all_off_half = []

    player_pos = 0.0
    all_pos = []


    for i in range(len(b_players)):
        if (b_players[i].name == player_name):
            player_sp = b_players[i].stats.core.shooting_percentage
            player_shots = b_players[i].stats.core.shots
            player_assists = b_players[i].stats.core.assists
            player_stolen = b_players[i].stats.boost.amount_stolen
            player_off_half = b_players[i].stats.positioning.time_offensive_half
            player_pos = b_players[i].stats.positioning.time_closest_to_ball
        all_SP.append(b_players[i].stats.core.shooting_percentage)
        all_shots.append(b_players[i].stats.core.shots)
        all_assists.append(b_players[i].stats.core.assists)
        all_stolen.append(b_players[i].stats.boost.amount_stolen)
        all_off_half.append(b_players[i].stats.positioning.time_offensive_half)
        all_pos.append(b_players[i].stats.positioning.time_closest_to_ball)

    for i in range(len(o_players)):
        if (o_players[i].name == player_name):
            player_sp = o_players[i].stats.core.shooting_percentage
            player_shots = o_players[i].stats.core.shots
            player_assists = o_players[i].stats.core.assists
            player_stolen = o_players[i].stats.boost.amount_stolen
            player_off_half = o_players[i].stats.positioning.time_offensive_half
            player_pos = o_players[i].stats.positioning.time_closest_to_ball
        all_SP.append(o_players[i].stats.core.shooting_percentage)
        all_shots.append(o_players[i].stats.core.shots)
        all_assists.append(o_players[i].stats.core.assists)
        all_stolen.append(o_players[i].stats.boost.amount_stolen)
        all_off_half.append(o_players[i].stats.positioning.time_offensive_half)
        all_pos.append(o_players[i].stats.positioning.time_closest_to_ball)

    score = (0.20)*(percent_bw(player_sp, all_SP, True)) + (0.15)*(percent_bw(player_assists, all_assists, True)) + (0.15)*(percent_bw(player_stolen, all_stolen, True)) + (0.20)*(percent_bw(player_shots, all_shots, True)) + (0.20)*(percent_bw(player_pos, all_pos, True)) + (0.10)*(percent_bw(player_off_half, all_off_half, True))
    return score

def get_defensive_score(replay: DetailedReplay, player_name: str):
    bteam = replay.blue
    oteam = replay.orange

    b_players = bteam.players
    o_players = oteam.players

    player_spa = 0.0
    all_SPA = []

    player_def_half = 0.0
    all_def_half = []

    player_saves = 0.0
    all_saves = []

    player_neutral_pos = 0.0
    all_neutral_pos = []

    player_bpm = 0.0
    all_bpm = []


    for i in range(len(b_players)):
        if (b_players[i].name == player_name):
            player_spa = (b_players[i].stats.core.goals_against / b_players[i].stats.core.shots_against)
            player_def_half = b_players[i].stats.positioning.time_offensive_half
            player_saves = b_players[i].stats.core.saves
            player_neutral_pos = b_players[i].stats.positioning.time_neutral_third
            player_bpm = b_players[i].stats.boost.bpm
        all_SPA.append((b_players[i].stats.core.goals_against / b_players[i].stats.core.shots_against))
        all_def_half.append(b_players[i].stats.positioning.time_defensive_half)
        all_saves.append(b_players[i].stats.core.saves)
        all_neutral_pos.append(b_players[i].stats.positioning.time_neutral_third)
        all_bpm.append(b_players[i].stats.boost.bpm)

    for i in range(len(o_players)):
        if (o_players[i].name == player_name):
            player_spa = (o_players[i].stats.core.goals_against / o_players[i].stats.core.shots_against)
            player_def_half = o_players[i].stats.positioning.time_defensive_half
            player_saves = o_players[i].stats.core.saves
            player_neutral_pos = o_players[i].stats.positioning.time_neutral_third
            player_bpm = o_players[i].stats.boost.bpm
        all_SPA.append((o_players[i].stats.core.goals_against / o_players[i].stats.core.shots_against))
        all_def_half.append(o_players[i].stats.positioning.time_defensive_half)
        all_saves.append(o_players[i].stats.core.saves)
        all_neutral_pos.append(o_players[i].stats.positioning.time_neutral_third)
        all_bpm.append(o_players[i].stats.boost.bpm)

    score = ((0.30)*percent_bw(player_spa, all_SPA, False)) + ((0.30)*percent_bw(player_saves, all_saves, True)) + ((0.15)*percent_bw(player_def_half, all_def_half, True)) + ((0.15)*percent_bw(player_neutral_pos, all_neutral_pos, True)) + ((0.10)*percent_bw(player_bpm, all_bpm, True))
    return score


def percent_bw(u_val: float, all_val: list[float], greater: bool):

    avg = sum(all_val) / len(all_val)
    min1 = min(all_val)
    max1 = max(all_val)

    if (greater):
        if (u_val == max1):
            return 100.0
        elif (u_val == min1):
            return 0.0
        elif(u_val != max1 and u_val > avg):
            p = ((max1 - u_val) / ((max1-avg)*2))
            return (p*100)+50.0
        elif(u_val != min1 and u_val < avg):
            p = (avg - u_val) / ((avg - min1)*2)
            return p*100
        elif (avg == 0.0 or u_val == avg):
            return 50.0
    else:
        if (u_val == min1):
            return 100.0
        elif (u_val == max1):
            return 0.0
        elif(u_val != min1 and u_val < avg):
            p = ((avg - u_val) / ((avg - min1)*2))
            return (p*100)+50.0
        elif(u_val != max1 and u_val > avg):
            p = ((max1 - u_val) / ((max1 - avg)*2))
            return 50 - (p*100)
        elif (avg == 0.0 or u_val == avg):
            return 50.0




