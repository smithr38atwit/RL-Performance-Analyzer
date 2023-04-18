export interface PlayerModel {
    name: string;
    hasReplays: boolean;
}

export interface PlayerStats {
    offense: number;
    defense: number;
    overall: number;
    replay_details: ReplayDetails;
    stat_vals: StatVals;
}

export interface ReplayDetails {
    map_name: string;
    result: Result;
    match_time: number;
    playlist: string;
    replay_name: string;
    replay_id: string;
}

export interface Result {
    player_team: number;
    opp_team: number;
}

export interface StatVals {
    off_vals: FVal[];
    def_vals: FVal[];
}

export interface FVal {
    stat_name: string;
    minimum: number;
    player_val: number;
    maximum: number;
}