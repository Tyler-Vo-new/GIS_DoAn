const API_BASE = "http://localhost:8000"; // chỉnh theo backend

export async function createFloor() {
    const res = await fetch(`${API_BASE}/system/create_data/`, {
        method: "POST",
    });
    return res.json();
}

export async function updateShaft(id, status, note = "") {
    const res = await fetch(`${API_BASE}/system/shaft/${id}/update/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, note }),
    });
    return res.json();
}

export async function updateConnection(id, status, note = "") {
    const res = await fetch(`${API_BASE}/system/connection/${id}/update/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, note }),
    });
    return res.json();
}

export async function getAllStorey() {
    const res = await fetch(`${API_BASE}/system/storey/all/`, {
        method: "GET"
    });
    return res.json();
}

export async function getShaftsByStorey(storeyCode) {
    const res = await fetch(
        `${API_BASE}/system/storey/${storeyCode}/shafts/`
    );
    return res.json();
}

export async function getRoomsByStorey(storeyCode) {
    const res = await fetch(
        `${API_BASE}/system/storey/${storeyCode}/rooms/`
    );
    return res.json();
}

export async function getConnectionsByStorey(storeyCode) {
    const res = await fetch(
        `${API_BASE}/system/storey/${storeyCode}/connections/`
    );
    return res.json();
}

export async function getRoomInfoById(roomId) {
    const res = await fetch(
        `${API_BASE}/system/room/${roomId}/`
    );
    return res.json();
}
