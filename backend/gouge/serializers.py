from rest_framework import serializers
from .models import Gouge, ExaminerProfile, AircraftType, OralTopic, FlightManeuver, GougeFeedback

class ExaminerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExaminerProfile
        fields = '__all__'

class AircraftTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AircraftType
        fields = '__all__'

class OralTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = OralTopic
        fields = '__all__'

class FlightManeuverSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightManeuver
        fields = '__all__'

class GougeFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = GougeFeedback
        fields = '__all__'

class GougeSerializer(serializers.ModelSerializer):
    examiner = ExaminerProfileSerializer(read_only=True)
    aircraft_type = AircraftTypeSerializer(read_only=True)
    oral_topics = OralTopicSerializer(many=True, read_only=True)
    flight_maneuvers = FlightManeuverSerializer(many=True, read_only=True)
    feedback = GougeFeedbackSerializer(many=True, read_only=True, source='gougefeedback_set')

    class Meta:
        model = Gouge
        fields = [
            'id', 'user', 'examiner', 'content', 'gouge_date', 'created_at', 'updated_at',
            'rating', 'pass_or_fail', 'flight_difficulty', 'oral_difficulty', 'stress_level',
            'unexpected_elements', 'location', 'aircraft_type', 'avionics_type', 'flyright_used',
            'flight_hours', 'oral_duration', 'flight_duration', 'checkride_type',
            'examiner_explanation', 'examiner_behavior', 'examiner_professionalism',
            'oral_topics', 'oral_pass', 'oral_difficult_topics',
            'flight_maneuvers', 'flight_pass', 'maneuver_ratings', 'flight_conditions',
            'examiner_focus', 'preparation_tips', 'stress_management_tips', 'general_feedback',
            'feedback'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        oral_topics = validated_data.pop('oral_topics', [])
        flight_maneuvers = validated_data.pop('flight_maneuvers', [])
        
        gouge = Gouge.objects.create(**validated_data)
        
        gouge.oral_topics.set(oral_topics)
        gouge.flight_maneuvers.set(flight_maneuvers)
        
        return gouge

    def update(self, instance, validated_data):
        oral_topics = validated_data.pop('oral_topics', None)
        flight_maneuvers = validated_data.pop('flight_maneuvers', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if oral_topics is not None:
            instance.oral_topics.set(oral_topics)
        if flight_maneuvers is not None:
            instance.flight_maneuvers.set(flight_maneuvers)
        
        instance.save()
        return instance