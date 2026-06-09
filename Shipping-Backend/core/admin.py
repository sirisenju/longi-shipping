from django.contrib import admin
from .models import Cargo, TrackingHistory

class TrackingHistoryInline(admin.TabularInline):
    model = TrackingHistory
    extra = 1

@admin.register(Cargo)
class CargoAdmin(admin.ModelAdmin):
    list_display = ('tracking_number', 'sender_name', 'receiver_name', 'destination', 'estimated_delivery', 'created_at')
    search_fields = ('tracking_number', 'receiver_name', 'sender_name')
    list_filter = ('created_at',)
    readonly_fields = ('tracking_number', 'created_at', 'id')
    inlines = [TrackingHistoryInline]

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields
        return ('tracking_number', 'created_at', 'id')
