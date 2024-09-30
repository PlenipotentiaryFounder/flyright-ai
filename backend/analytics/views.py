from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import UserActivity, PerformanceMetric
from .serializers import UserActivitySerializer, PerformanceMetricSerializer
import logging

logger = logging.getLogger(__name__)

class UserActivityList(generics.ListCreateAPIView):
    serializer_class = UserActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserActivity.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
            logger.info(f"User activity logged for user {self.request.user.username}")
        except Exception as e:
            logger.error(f"Error logging user activity: {str(e)}")
            raise

class UserActivityDetail(generics.RetrieveAPIView):
    serializer_class = UserActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserActivity.objects.filter(user=self.request.user)

class PerformanceMetricList(generics.ListCreateAPIView):
    serializer_class = PerformanceMetricSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PerformanceMetric.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
            logger.info(f"Performance metric logged for user {self.request.user.username}")
        except Exception as e:
            logger.error(f"Error logging performance metric: {str(e)}")
            raise

class PerformanceMetricDetail(generics.RetrieveAPIView):
    serializer_class = PerformanceMetricSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PerformanceMetric.objects.filter(user=self.request.user)