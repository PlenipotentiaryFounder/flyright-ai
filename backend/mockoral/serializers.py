from rest_framework import serializers
from .models import MockOralSession

class MockOralSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MockOralSession
        fields = ['id', 'user', 'examiner_name', 'created_at', 'score', 'status', 'topics_covered', 'questions_asked']
        read_only_fields = ['id', 'created_at']