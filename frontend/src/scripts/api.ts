const api = 'http://127.0.0.1:8000';

export async function getRoot() {
    const url = api;
    console.debug(`GET: ${url}`);
    try {
        const response = await fetch(url, { method: 'GET' });
        return await response.json();
    } catch (error) {
        console.debug(error);
        return false;
    }
}

export async function getReplays(playerName: string) {
    const url = `${api}/get_recent_replays/${playerName}`;
    console.debug(`GET: ${url}`);
    try {
        const response = await fetch(url, { method: 'GET' });
        return await response.json();
    } catch (error) {
        console.debug(error);
        return false;
    }
}