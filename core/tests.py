from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Cargo, TrackingHistory
from datetime import date

class CargoTrackingTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.cargo = Cargo.objects.create(
            sender_name="John Doe",
            receiver_name="Jane Smith",
            destination="123 Main St",
            weight=10.5,
            estimated_delivery=date.today()
        )
        self.history1 = TrackingHistory.objects.create(
            cargo=self.cargo,
            status=TrackingHistory.StatusChoices.PENDING,
            current_location="Warehouse A"
        )
        self.history2 = TrackingHistory.objects.create(
            cargo=self.cargo,
            status=TrackingHistory.StatusChoices.IN_TRANSIT,
            current_location="Warehouse B"
        )
        self.url = reverse('track_cargo')

    def test_tracking_number_generation(self):
        self.assertTrue(self.cargo.tracking_number.startswith("CRG-"))
        self.assertEqual(len(self.cargo.tracking_number), 17) # CRG-YYYY-XXXXXXXX

    def test_track_cargo_success(self):
        response = self.client.get(f"{self.url}?number={self.cargo.tracking_number}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['tracking_number'], self.cargo.tracking_number)
        self.assertEqual(len(response.data['history']), 2)
        # Verify ordering (descending by updated_at)
        self.assertEqual(response.data['history'][0]['status'], 'IN_TRANSIT')

    def test_track_cargo_not_found(self):
        response = self.client.get(f"{self.url}?number=INVALID123")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Tracking number not found.")

    def test_track_cargo_no_number(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "Tracking number is required.")
