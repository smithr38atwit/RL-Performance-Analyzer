const api = 'http://127.0.0.1:8000';

export function getRoot() {
    const url = api;
    console.debug(`GET: ${url}`);
    return fetch(url, { method: 'GET' });
}

export function getReplays(playerName: string) {
    const url = `${api}/get_recent_replays/${playerName}`;
    console.debug(`GET: ${url}`);
    return fetch(url, { method: 'GET' });
}