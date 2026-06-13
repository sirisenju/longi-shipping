# pyrefly: ignore [missing-import]
from django.core.management.base import BaseCommand
from core.models import Cargo, TrackingHistory, CargoItem
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Seeds sample cargo data'

    def handle(self, *args, **kwargs):
        # Clear existing data to start fresh
        TrackingHistory.objects.all().delete()
        CargoItem.objects.all().delete()
        Cargo.objects.all().delete()

        # Create Cargo 1
        cargo1 = Cargo.objects.create(
            sender_name="John Doe",
            receiver_name="Jane Smith",
            receiver_email="jane.smith@example.com",
            destination="123 Ocean Drive, Miami, FL",
            weight=45.20,
            estimated_delivery=date.today() + timedelta(days=5),
            shipping_fee=1250.00,
            insurance_fee=150.00
        )
        TrackingHistory.objects.create(
            cargo=cargo1,
            status=TrackingHistory.StatusChoices.PENDING,
            current_location="Shenzhen Port",
            remarks="Cargo received and registered."
        )
        TrackingHistory.objects.create(
            cargo=cargo1,
            status=TrackingHistory.StatusChoices.IN_TRANSIT,
            current_location="Pacific Ocean",
            remarks="In transit to the US west coast."
        )
        
        # Seed Cargo 1 Items
        CargoItem.objects.create(
            cargo=cargo1,
            name="Pro-Display OLED Screen Panel",
            quantity=50,
            weight=0.80,
            price=399.00,
            condition="Excellent (Fragile)"
        )
        CargoItem.objects.create(
            cargo=cargo1,
            name="High-Capacity Li-Ion Power Battery Pack",
            quantity=100,
            weight=0.15,
            price=45.00,
            condition="Excellent (Hazmat Class 9)"
        )

        # Create Cargo 2
        cargo2 = Cargo.objects.create(
            sender_name="Alice Johnson",
            receiver_name="Bob Wilson",
            receiver_email="bob.wilson@example.com",
            destination="456 Pine Ave, Seattle, WA",
            weight=12.80,
            estimated_delivery=date.today() + timedelta(days=2),
            shipping_fee=450.00,
            insurance_fee=50.00
        )
        TrackingHistory.objects.create(
            cargo=cargo2,
            status=TrackingHistory.StatusChoices.DELIVERED,
            current_location="Seattle Hub",
            remarks="Delivered to front porch."
        )
        
        # Seed Cargo 2 Items
        CargoItem.objects.create(
            cargo=cargo2,
            name="Ultralight Carbon Fiber Bicycle Frame",
            quantity=2,
            weight=1.20,
            price=1200.00,
            condition="Good (Slight carton wear)"
        )
        CargoItem.objects.create(
            cargo=cargo2,
            name="Professional Carbon Wheelset 700c",
            quantity=2,
            weight=1.50,
            price=850.00,
            condition="Delivered Intact"
        )

        self.stdout.write(self.style.SUCCESS('Successfully seeded sample data!'))
        self.stdout.write(self.style.SUCCESS(f'Sample 1 Tracking Number: {cargo1.tracking_number}'))
        self.stdout.write(self.style.SUCCESS(f'Sample 2 Tracking Number: {cargo2.tracking_number}'))

