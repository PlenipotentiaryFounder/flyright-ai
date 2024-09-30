from rest_framework import serializers
from .models import Gouge

class GougeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gouge
        fields = ['id', 'user', 'examiner_name', 'date', 'outcome', 'text', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']