const api = 'http://127.0.0.1:8000';

export function getRoot() {
    return fetch(api, { method: "GET" });
}

export function hasReplays(playerName: string) {
    return fetch(`${api}/has_replays/${playerName}`)
}