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

class ID(BaseModel):
    platform: Optional[str]
    id: Optional[str]

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
    boost: dict[str, float]
    movement: dict[str, float]
    positioning: dict[str, float]
    demo: Demo

class Ball(BaseModel):
    possession_time: float
    time_in_side: float

class Stats(BaseModel):
    ball: Ball
    core: Core
    boost: dict[str, float]
    movement: dict[str, float]
    positioning: dict[str, float]
    demo: Demo

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
    stats: Stats

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