from django.urls import path
from .views import TrackCargoView

urlpatterns = [
    path('v1/track/', TrackCargoView.as_view(), name='track_cargo'),
]
