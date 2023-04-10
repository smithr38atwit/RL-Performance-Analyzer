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

    #testing:
    replay_id = 'e693f6b8-8734-417a-a70a-80704d9d38d3'
    # player_name = 'EmpereurTrou78'

    r = requests.get(f'{bc_url}replays/{replay_id}', headers=headers) # Get specific replay
    if (r.status_code != 200):
        return False
    
    data = r.json()
    replay = DetailedReplay(**data)

    # testing
    # print('Replay ID: ' + str(replay.id))
    if player_name == 'a': return {'offense': 70, 'defense': 90, 'overall': 80}
    if player_name == 'b': return {'offense': 40, 'defense': 60, 'overall': 50}
    if player_name == 'c': return {'offense': 100, 'defense': 20, 'overall': 60}

    # return calculate_scores(replay, player_name)
    print('\n--- Offensive Scores ---\n')
    offensive = int(get_offensive_score(replay, player_name))
    print('--- Defensive Scores ---\n')
    defensive = int(get_defensive_score(replay, player_name))
    overall = ((offensive + defensive)/2) #* 1.10
    
    stats = {'offense': offensive, 'defense': defensive, 'overall': overall}

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


    for player in b_players:
        if player.id.platform == None: continue
        if (player.name == player_name):
            player_sp = player.stats.core.shooting_percentage
            player_shots = player.stats.core.shots
            player_assists = player.stats.core.assists
            player_stolen = player.stats.boost.amount_stolen
            player_off_half = player.stats.positioning.time_offensive_half
            player_pos = player.stats.positioning.time_closest_to_ball
        else:
            all_SP.append(player.stats.core.shooting_percentage)
            all_shots.append(player.stats.core.shots)
            all_assists.append(player.stats.core.assists)
            all_stolen.append(player.stats.boost.amount_stolen)
            all_off_half.append(player.stats.positioning.time_offensive_half)
            all_pos.append(player.stats.positioning.time_closest_to_ball)

    for player in o_players:
        if player.id.platform == None: continue
        if (player.name == player_name):
            player_sp = player.stats.core.shooting_percentage
            player_shots = player.stats.core.shots
            player_assists = player.stats.core.assists
            player_stolen = player.stats.boost.amount_stolen
            player_off_half = player.stats.positioning.time_offensive_half
            player_pos = player.stats.positioning.time_closest_to_ball
        else:
            all_SP.append(player.stats.core.shooting_percentage)
            all_shots.append(player.stats.core.shots)
            all_assists.append(player.stats.core.assists)
            all_stolen.append(player.stats.boost.amount_stolen)
            all_off_half.append(player.stats.positioning.time_offensive_half)
            all_pos.append(player.stats.positioning.time_closest_to_ball)

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


    for player in b_players:
        if player.id.platform == None: continue
        if (player.name == player_name):
            player_spa = (player.stats.core.goals_against / player.stats.core.shots_against)
            player_def_half = player.stats.positioning.time_offensive_half
            player_saves = player.stats.core.saves
            player_neutral_pos = player.stats.positioning.time_neutral_third
            player_bpm = player.stats.boost.bpm
        else:
            all_SPA.append((player.stats.core.goals_against / player.stats.core.shots_against))
            all_def_half.append(player.stats.positioning.time_defensive_half)
            all_saves.append(player.stats.core.saves)
            all_neutral_pos.append(player.stats.positioning.time_neutral_third)
            all_bpm.append(player.stats.boost.bpm)

    for player in o_players:
        if player.id.platform == None: continue
        if (player.name == player_name):
            player_spa = (player.stats.core.goals_against / player.stats.core.shots_against)
            player_def_half = player.stats.positioning.time_defensive_half
            player_saves = player.stats.core.saves
            player_neutral_pos = player.stats.positioning.time_neutral_third
            player_bpm = player.stats.boost.bpm
        else:
            all_SPA.append((player.stats.core.goals_against / player.stats.core.shots_against))
            all_def_half.append(player.stats.positioning.time_defensive_half)
            all_saves.append(player.stats.core.saves)
            all_neutral_pos.append(player.stats.positioning.time_neutral_third)
            all_bpm.append(player.stats.boost.bpm)

    score = ((0.30)*percent_bw(player_spa, all_SPA, False)) + ((0.30)*percent_bw(player_saves, all_saves, True)) + ((0.15)*percent_bw(player_def_half, all_def_half, True)) + ((0.15)*percent_bw(player_neutral_pos, all_neutral_pos, True)) + ((0.10)*percent_bw(player_bpm, all_bpm, True))
    return score


def percent_bw(u_val: float, all_val: list[float], greater: bool):
    avg = sum(all_val) / len(all_val)
    min1 = min(all_val)
    max1 = max(all_val)

    #testing
    print(f'Player: {u_val}\n' +
          f'All: {all_val}\n' +
          f'Min: {min1}, Max: {max1}, Avg: {avg}')

    score = 0.0
    if (avg == 0.0 or u_val == avg):
        score = 50.0
    elif (u_val >= max1):
        score = 100.0
    elif (u_val <= min1):
        score = 0.0
    elif (u_val > avg):
        p = (u_val - avg) / (max1 - avg)
        score = 50.0 + (50 * p)
    elif (u_val < avg):
        p = (u_val - min1) / (avg - min1)
        score = p * 50.0

    if not greater: score = 100 - score
    print(f'Score: {score}\n')
    return score
   
