interface Ping {
    message: string;
    error: string | null;
}

function ping() {
    fetch("http://127.0.0.1:8000", {
        method: "GET"
    })
        .then(async response => {
            if (!response.ok) {
                const data = await response.json();
                console.log(data.message);
                throw new Error(data.error);
            }
            return response.json();
        })
        .then(data => {
            console.debug("--- GET: http://127.0.0.1:8000 ---");
            console.log(data.message);
        })
        .catch(error => {
            document.getElementById("bc-conn")!.style.visibility = "visible";
            console.debug(error);
        })
}

//test