# pyrefly: ignore [missing-import]
from rest_framework import serializers
from .models import Cargo, TrackingHistory, CargoItem

class TrackingHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackingHistory
        fields = ['status', 'current_location', 'remarks', 'updated_at']

class CargoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CargoItem
        fields = ['id', 'name', 'quantity', 'weight', 'price', 'condition']

class CargoSerializer(serializers.ModelSerializer):
    history = TrackingHistorySerializer(many=True, read_only=True)
    items = CargoItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cargo
        fields = [
            'tracking_number', 'sender_name', 'receiver_name', 'receiver_email',
            'destination', 'weight', 'estimated_delivery', 'created_at', 'history',
            'items', 'shipping_fee', 'insurance_fee'
        ]

class ContactMessageSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    company = serializers.CharField(max_length=255, required=False, allow_blank=True)
    service = serializers.CharField(max_length=100, required=False, allow_blank=True)
    message = serializers.CharField()

