interface Ping {
    status_code: number;
    error: string | null;
}

async function ping() {
    let response = await fetch("http://127.0.0.1:8000", { method: "GET" });
    let data: Ping = (await response.json()) as Ping;

    console.debug("--- GET: http://127.0.0.1:8000 ---");
    console.debug(data);

    // Show connection error icon if bad status code is returned
    if (data.status_code != 200) {
        document.getElementById("bc-conn")!.style.visibility = "visible";
        console.debug("Ballchasing API error: " + data?.error);
    }
}