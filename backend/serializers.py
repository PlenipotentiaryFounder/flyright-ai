from rest_framework import serializers
from .models import Scenario, Question, Report, Examiner

class ScenarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scenario
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

class ExaminerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examiner
        fields = '__all__'