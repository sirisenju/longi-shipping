# pyrefly: ignore [missing-import]
from django.urls import path
from .views import TrackCargoView, ContactMessageView

urlpatterns = [
    path('v1/track/', TrackCargoView.as_view(), name='track_cargo'),
    path('v1/contact/', ContactMessageView.as_view(), name='contact_message'),
]
