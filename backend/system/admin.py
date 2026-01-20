from django.contrib import admin
from .models import Storey, Room, Shaft, Connection
# Register your models here.
admin.site.register([Storey, Room, Shaft, Connection])