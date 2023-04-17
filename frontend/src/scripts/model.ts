export interface PlayerModel {
    name: string;
    hasReplays: boolean;
}

export interface PlayerStats {
    offense: number;
    defense: number;
    overall: number;
    stat_vals: StatVals;
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