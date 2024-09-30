from rest_framework import generics, permissions, filters
from .models import Gouge
from .serializers import GougeSerializer
import logging

logger = logging.getLogger(__name__)

class GougeList(generics.ListCreateAPIView):
    serializer_class = GougeSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['examiner_name', 'text']

    def get_queryset(self):
        return Gouge.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        logger.info(f"Gouge created by user {self.request.user.username}")

class GougeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GougeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Gouge.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save()
        logger.info(f"Gouge {serializer.instance.id} updated by user {self.request.user.username}")

    def perform_destroy(self, instance):
        logger.info(f"Gouge {instance.id} deleted by user {self.request.user.username}")
        instance.delete()