import uvicorn


if __name__ == "__main__":
    # run app from "app\api" with IP/port 127.0.0.1:8000; enable server reload when code is changed
    uvicorn.run("app.api:app", host="127.0.0.1", port=8000, reload=True)