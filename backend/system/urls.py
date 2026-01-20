from django.urls import path
from . import views

urlpatterns  = [
    path("create_data/", views.api_create_floor, name="create_data"),
    path("shaft/<int:shaft_id>/update/", views.api_update_shaft, name="update_shaft"),
    path("connection/<int:connection_id>/update/", views.api_update_connection, name="update_connection"),
    path('storey/all/', views.get_all_storey, name="get_all_storey"),
    path('storey/<str:storey_code>/shafts/', views.get_all_shaft_by_storey, name="get_all_shaft_by_storey"),
    path('storey/<str:storey_code>/rooms/', views.get_all_room_by_storey, name="get_all_room_by_storey"),
    path('storey/<str:storey_code>/connections/', views.get_all_connection_by_storey, name="get_all_connection_by_storey"),
    path('room/<int:room_id>/', views.get_room_info_by_id, name="get_room_info_by_id"),
]