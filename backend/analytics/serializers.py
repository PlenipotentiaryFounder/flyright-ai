from rest_framework import serializers
from .models import UserActivity, PerformanceMetric

class UserActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserActivity
        fields = ['id', 'user', 'activity_type', 'timestamp', 'details']
        read_only_fields = ['id', 'timestamp']

class PerformanceMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceMetric
        fields = ['id', 'user', 'metric_type', 'value', 'timestamp']
        read_only_fields = ['id', 'timestamp']