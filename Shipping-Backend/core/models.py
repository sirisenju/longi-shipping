import uuid
import secrets
import string
from django.db import models
from django.utils import timezone

def generate_tracking_number():
    year = timezone.now().year
    random_chars = ''.join(secrets.SystemRandom().choices(string.ascii_uppercase + string.digits, k=8))
    return f"CRG-{year}-{random_chars}"

class Cargo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tracking_number = models.CharField(max_length=20, unique=True, db_index=True, blank=True)
    sender_name = models.CharField(max_length=255)
    receiver_name = models.CharField(max_length=255)
    receiver_email = models.EmailField(blank=True, null=True)
    destination = models.TextField()
    weight = models.DecimalField(max_digits=6, decimal_places=2)
    estimated_delivery = models.DateField()
    shipping_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    insurance_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.tracking_number:
            self.tracking_number = generate_tracking_number()
            # Ensure uniqueness
            while Cargo.objects.filter(tracking_number=self.tracking_number).exists():
                self.tracking_number = generate_tracking_number()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.tracking_number} - {self.receiver_name}"

class CargoItem(models.Model):
    id = models.AutoField(primary_key=True)
    cargo = models.ForeignKey(Cargo, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)
    weight = models.DecimalField(max_digits=8, decimal_places=2) # unit weight in kg
    price = models.DecimalField(max_digits=10, decimal_places=2) # unit price in USD
    condition = models.CharField(max_length=100, default='Excellent')

    def __str__(self):
        return f"{self.quantity}x {self.name} ({self.cargo.tracking_number})"


class TrackingHistory(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        IN_TRANSIT = 'IN_TRANSIT', 'In Transit'
        OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY', 'Out for Delivery'
        DELIVERED = 'DELIVERED', 'Delivered'
        DELAYED = 'DELAYED', 'Delayed'

    id = models.AutoField(primary_key=True)
    cargo = models.ForeignKey(Cargo, on_delete=models.CASCADE, related_name='history')
    status = models.CharField(
        max_length=20,
        choices=StatusChoices.choices,
        default=StatusChoices.PENDING
    )
    current_location = models.CharField(max_length=255)
    remarks = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.cargo.tracking_number} - {self.status} at {self.current_location}"
