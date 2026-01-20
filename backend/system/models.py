from django.db import models

# Create your models here.
class Storey(models.Model):
    code = models.CharField(max_length=50, unique=True)
    level = models.IntegerField()
    label = models.CharField(max_length=100)

class Room(models.Model):
    code = models.CharField(max_length=50, unique=True)
    storey = models.ForeignKey(Storey, on_delete=models.CASCADE)
    
    points = models.JSONField()
    label_x = models.FloatField()
    label_y = models.FloatField()
    
    class Meta:
        unique_together = ("code", "storey")

class Shaft(models.Model):
    TYPES = [
        ("electricity", "Điện"),
        ("ventilation", "Thông gió"),
        ("water", "Nước")
    ]
    
    STATUS = [
        ("active", "Hoạt động"),
        ("maintenance", "Đang bảo trì"),
        ("error", "Hỏng")
    ]
    
    storey = models.ForeignKey(Storey, on_delete=models.CASCADE)
    system = models.CharField(max_length=30, choices=TYPES)
    
    x = models.FloatField()
    y1 = models.FloatField()
    y2 = models.FloatField()
    
    status = models.CharField(max_length=50, choices=STATUS)
    note = models.TextField(blank=True, null=True)
    
class Connection(models.Model):
    TYPES = [
        ("electricity", "Điện"),
        ("ventilation", "Thông gió"),
        ("water", "Nước")
    ]
    
    STATUS = [
        ("active", "Hoạt động"),
        ("maintenance", "Đang bảo trì"),
        ("error", "Hỏng")
    ]
    
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    shaft = models.ForeignKey(Shaft, on_delete=models.CASCADE)
    system = models.CharField(max_length=20, choices=TYPES)
    path = models.JSONField()
    
    status = models.CharField(max_length=20, choices=STATUS)
    note = models.TextField(blank=True, null=True)

