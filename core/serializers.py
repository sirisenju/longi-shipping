from rest_framework import serializers
from .models import Cargo, TrackingHistory

class TrackingHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackingHistory
        fields = ['status', 'current_location', 'remarks', 'updated_at']

class CargoSerializer(serializers.ModelSerializer):
    history = TrackingHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Cargo
        fields = [
            'tracking_number', 'sender_name', 'receiver_name', 'receiver_email',
            'destination', 'weight', 'estimated_delivery', 'created_at', 'history'
        ]
