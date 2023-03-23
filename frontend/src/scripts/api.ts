const api = 'http://127.0.0.1:8000';

function getRoot() {
    return fetch(api, { method: "GET" });
}

export default getRoot;