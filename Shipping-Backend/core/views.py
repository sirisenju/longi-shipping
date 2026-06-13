from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import Cargo
from .serializers import CargoSerializer, ContactMessageSerializer
from .tasks import send_contact_email_task

class TrackCargoView(APIView):
    permission_classes = [AllowAny]
    # Throttling is configured globally in settings.py (AnonRateThrottle),
    # but we can explicitly set it here if needed:
    # throttle_classes = [AnonRateThrottle]

    def get(self, request, *args, **kwargs):
        tracking_number = request.query_params.get('number')

        if not tracking_number:
            return Response(
                {"error": "Tracking number is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Optimize DB queries by prefetching the related history
            cargo = Cargo.objects.prefetch_related('history').get(tracking_number=tracking_number)
            serializer = CargoSerializer(cargo)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Cargo.DoesNotExist:
            return Response(
                {"error": "Tracking number not found."},
                status=status.HTTP_404_NOT_FOUND
            )

class ContactMessageView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            # Dispatch Celery background task
            send_contact_email_task.delay(
                name=data.get('name'),
                email=data.get('email'),
                company=data.get('company', ''),
                service=data.get('service', ''),
                message=data.get('message')
            )
            return Response(
                {"message": "Thank you for contacting us. Your message has been sent successfully."},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

