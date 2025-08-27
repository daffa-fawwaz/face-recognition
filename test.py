import base64
import websocket
import json

WS_URL = "ws://localhost:8000/ws/log-laptop"

with open("/Users/daffafawwaz/Documents/kamera/daffa.jpg", "rb") as f:
    img_bytes = f.read()
    img_b64 = base64.b64encode(img_bytes).decode("utf-8")

payload = {
    "frame": f"data:image/jpeg;base64,{img_b64}",
    "action": "mengambil"
}

ws = websocket.create_connection(WS_URL)

ws.send(json.dumps(payload))

resp = ws.recv()
print("Response:", resp)

ws.close()

