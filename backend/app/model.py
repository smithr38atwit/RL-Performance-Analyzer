from datetime import datetime
from typing import Any, Optional
from uuid import UUID
from pydantic import BaseModel


# ------ For filter replays API ------

class ReplaySimple(BaseModel):
    id: UUID
    link: str
    rocket_league_id: str
    replay_title: str
    map_code: str
    map_name: str
    playlist_id: str
    playlist_name: str
    duration: int
    overtime: bool
    season: int
    season_type: str
    date: datetime
    date_has_tz: bool
    visibility: str
    created: datetime
    uploader: Any
    blue: Any
    orange: Any

class FilteredReplays(BaseModel):
    count: Optional[int]
    list: list[ReplaySimple]
    next: Optional[str]


# ------ For individual replay API ------

class Positioning(BaseModel):
    avg_distance_to_ball: float
    avg_distance_to_ball_possession: float
    avg_distance_to_ball_no_possession: float
    avg_distance_to_mates: float
    time_defensive_third: float
    time_neutral_third: float
    time_offensive_third: float
    time_defensive_half: float
    time_offensive_half: float
    time_behind_ball: float
    time_infront_ball: float
    time_most_back: float
    time_most_forward: float
    goals_against_while_last_defender: Optional[int]
    time_closest_to_ball: float
    time_farthest_from_ball: float
    percent_defensive_third: float
    percent_offensive_third: float
    percent_neutral_third: float
    percent_defensive_half: float
    percent_offensive_half: float
    percent_behind_ball: float
    percent_infront_ball: float
    percent_most_back: float
    percent_most_forward: float
    percent_closest_to_ball: float
    percent_farthest_from_ball: float

class Movement(BaseModel):
    avg_speed: float
    total_distance: float
    time_supersonic_speed: float
    time_boost_speed: float
    time_slow_speed: float
    time_ground: float
    time_low_air: float
    time_high_air: float
    time_powerslide: float
    count_powerslide: int
    avg_powerslide_duration: float
    avg_speed_percentage: float
    percent_slow_speed: float
    percent_boost_speed: float
    percent_supersonic_speed: float
    percent_ground: float
    percent_low_air: float
    percent_high_air: float

class Boost(BaseModel):
    bpm: float
    bcpm: float
    avg_amount: float
    amount_collected: int
    amount_stolen: int
    amount_collected_big: int
    amount_stolen_big: int
    amount_collected_small: int
    amount_stolen_small: int
    count_collected_big: int
    count_stolen_big: int
    count_collected_small: int
    count_stolen_small: int
    amount_overfill: int
    amount_overfill_stolen: int
    amount_used_while_supersonic: int
    time_zero_boost: float
    percent_zero_boost: float
    time_full_boost: float
    percent_full_boost: float
    time_boost_0_25: float
    time_boost_25_50: float
    time_boost_50_75: float
    time_boost_75_100: float
    percent_boost_0_25: float
    percent_boost_25_50: float
    percent_boost_50_75: float
    percent_boost_75_100: float

class Core(BaseModel):
    shots: int
    shots_against: int
    goals: int
    goals_against: int
    saves: int
    assists: int
    score: int
    mvp: Optional[bool]
    shooting_percentage: float

class Demo(BaseModel):
    inflicted: int
    taken: int

class PlayerStats(BaseModel):
    core: Core
    boost: Boost
    movement: Movement
    positioning: Positioning
    demo: Demo

class Ball(BaseModel):
    possession_time: float
    time_in_side: float

class ID(BaseModel):
    platform: Optional[str]
    id: Optional[str]

class Player(BaseModel):
    start_time: float
    end_time: float
    name: str
    id: ID
    car_id: int
    car_name: str
    camera: dict[str, float]
    steering_sensitivity: float
    stats: PlayerStats

class Team(BaseModel):
    color: str
    players: list[Player]

class Uploader(BaseModel):
    steam_id: str
    name: str
    profile_url: str
    avatar: str

class DetailedReplay(BaseModel):
    id: UUID
    link: str
    created: datetime
    uploader: Uploader
    status: str
    rocket_league_id: str
    match_guid: str
    title: str
    map_code: str
    match_type: str
    team_size: int
    playlist_id: str
    duration: int
    overtime: bool
    season: int
    season_type: str
    date: datetime
    date_has_timezone: bool
    visibility: str
    blue: Team
    orange: Team
    playlist_name: str
    map_name: str