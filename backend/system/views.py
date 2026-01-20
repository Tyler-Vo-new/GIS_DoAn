from django.shortcuts import render
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Room, Shaft, Storey, Connection
from .constants import CORRIDOR, MAIN_SHAFT_X, SYSTEMS, BASE_ROOMS

# Create your views here.
def get_room_port(room_points, system):
    xs = [p[0] for p in room_points]
    ys = [p[1] for p in room_points]

    is_left = max(xs) < MAIN_SHAFT_X

    return {
        "x": max(xs) if is_left else min(xs),
        "y": (min(ys) + max(ys)) / 2 + SYSTEMS[system]["slot"],
        "dir": 1 if is_left else -1,
    }


def get_corridor_port(room_points, system):
    ys = [p[1] for p in room_points]
    xs = [p[0] for p in room_points]

    is_left = max(xs) < MAIN_SHAFT_X

    return {
        "x": CORRIDOR["x1"] if is_left else CORRIDOR["x2"],
        "y": (min(ys) + max(ys)) / 2 + SYSTEMS[system]["slot"],
        "dir": 1 if is_left else -1,
    }


def build_path(room_points, system, shaft_x):
    room_port = get_room_port(room_points, system)
    corridor_port = get_corridor_port(room_points, system)

    elbow_x = corridor_port["x"] + corridor_port["dir"] * 20

    return [
        [room_port["x"], room_port["y"]],
        [elbow_x, room_port["y"]],
        [elbow_x, corridor_port["y"]],
        [corridor_port["x"], corridor_port["y"]],
        [shaft_x, corridor_port["y"]],
    ]


def create_floor():
    if Storey.objects.exists():
        return
    
    for i in range(1, 5):
        storey = Storey.objects.create(
            code=f"F{i}",
            level=i,
            label=f"Tầng {i} Tòa AB"
        )

        # ---- ROOMS ----
        for room in BASE_ROOMS:
            suffix = room["id"][-2:]     # "01"..."19"
            code = f"P{i}{suffix}"

            Room.objects.create(
                code=code,
                storey=storey,
                points=room["points"],
                label_x=room["label"]["x"],
                label_y=room["label"]["y"],
            )

        # ---- SHAFTS ----
        for system, conf in SYSTEMS.items():
            Shaft.objects.create(
                storey=storey,
                system=system,
                x=MAIN_SHAFT_X,
                y1=40,
                y2=900,
                status="active",
            )

        # ---- CONNECTIONS ----
        for room in storey.room_set.all():
            for shaft in storey.shaft_set.all():
                path = build_path(
                    room_points=room.points,
                    system=shaft.system,
                    shaft_x=shaft.x
                )

                Connection.objects.create(
                    room=room,
                    shaft=shaft,
                    system=shaft.system,
                    path=path,
                    status="active",
                )

@transaction.atomic
def update_shaft_status(shaft_id, new_status, note=None):
    """Update trạng thái của 1 shaft"""
    shaft = Shaft.objects.select_for_update().get(id=shaft_id)
    shaft.status = new_status
    if note is not None:
        shaft.note = note
    shaft.save()
    
    return shaft

@transaction.atomic
def update_connection_status(connection_id, new_status, note=None):
    """Update trạng thái của 1 connection của 1 phòng"""
    conn = Connection.objects.select_for_update().get(id=connection_id)
    shaft = conn.shaft

    # RULE CHỐNG VI PHẠM
    if shaft.status == "error" and new_status != "error":
        raise ValueError("Không thể set connection active khi shaft đang lỗi")

    if shaft.status == "maintenance" and new_status == "active":
        raise ValueError("Không thể set connection active khi shaft đang bảo trì")

    conn.status = new_status
    if note is not None:
        conn.note = note
    conn.save()

    return conn

@api_view(["POST"])
def api_create_floor(request):
    create_floor()
    return Response({"message": "Floors created successfully"})

@api_view(["POST"])
def api_update_shaft(request, shaft_id):
    status_value = request.data.get("status")
    note = request.data.get("note")

    if status_value not in dict(Shaft.STATUS):
        return Response(
            {"error": "Invalid status"},
            status=status.HTTP_400_BAD_REQUEST
        )

    shaft = update_shaft_status(shaft_id, status_value, note)

    return Response({
        "id": shaft.id,
        "status": shaft.status
    })


@api_view(["POST"])
def api_update_connection(request, connection_id):
    status_value = request.data.get("status")
    note = request.data.get("note")

    # FIX: nếu FE gửi object
    if isinstance(status_value, dict):
        status_value = status_value.get("value") or status_value.get("statusE")

    VALID_STATUS = dict(Connection.STATUS).keys()

    if status_value not in VALID_STATUS:
        return Response(
            {
                "error": "Invalid status",
                "received": status_value,
                "allowed": list(VALID_STATUS)
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        conn = update_connection_status(connection_id, status_value, note)
    except ValueError as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

    return Response({
        "id": conn.id,
        "status": conn.status
    })


    
@api_view(["GET"])
def get_all_storey(request):
    storeys = Storey.objects.all().values(
        "id", "code", "level", "label"
    )
    return Response(list(storeys))

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

@api_view(["GET"])
def get_all_shaft_by_storey(request, storey_code):
    storey = get_object_or_404(Storey, code=storey_code)

    shafts = Shaft.objects.filter(storey=storey).values(
        "id",
        "system",
        "x",
        "y1",
        "y2",
        "status",
        "note",
        "storey"
    )

    return Response({
        "storey": {
            "id": storey.id,
            "code": storey.code,
            "label": storey.label,
            "level": storey.level,
        },
        "shafts": list(shafts)
    }, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_all_room_by_storey(request, storey_code):
    storey = get_object_or_404(Storey, code=storey_code)

    rooms = Room.objects.filter(storey=storey).values(
        "id",
        "code",
        "storey",
        "points",
        "label_x",
        "label_y"
    )

    return Response({
        "storey": {
            "id": storey.id,
            "code": storey.code,
            "label": storey.label,
            "level": storey.level,
        },
        "rooms": list(rooms)
    }, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_all_connection_by_storey(request, storey_code):
    storey = get_object_or_404(Storey, code=storey_code)

    connections = Connection.objects.filter(
        room__storey=storey
    ).select_related("room", "shaft").values(
        "id",
        "system",
        "status",
        "note",
        "path",
        "room_id",
        "shaft_id"
    )

    return Response({
        "storey": {
            "id": storey.id,
            "code": storey.code,
            "label": storey.label,
            "level": storey.level,
        },
        "connections": list(connections)
    })

@api_view(["GET"])
def get_room_info_by_id(request, room_id):
    room = get_object_or_404(Room, id=room_id)
    data = {
        "id": room.id,
        "code": room.code,
        "storey": room.storey_id,
        "points": room.points,
        "label_x": room.label_x,
        "label_y": room.label_y,
    }
    return Response(data)