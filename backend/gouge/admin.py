from django.contrib import admin
from .models import (
    ExaminerProfile,
    AircraftType,
    OralTopic,
    FlightManeuver,
    Gouge,
    GougeFeedback,
    FlightCondition
)

@admin.register(ExaminerProfile)
class ExaminerProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'organization', 'years_of_experience', 'avg_rating']
    search_fields = ['name', 'organization']
    list_filter = ['organization']

@admin.register(AircraftType)
class AircraftTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'category']
    search_fields = ['name', 'category']
    list_filter = ['category']

@admin.register(OralTopic)
class OralTopicAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name', 'description']

@admin.register(FlightManeuver)
class FlightManeuverAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name', 'description']

@admin.register(Gouge)
class GougeAdmin(admin.ModelAdmin):
    list_display = ['examiner', 'checkride_type', 'gouge_date', 'pass_or_fail']
    list_filter = ['checkride_type', 'pass_or_fail', 'aircraft_type']
    search_fields = ['examiner__name', 'content']
    date_hierarchy = 'gouge_date'

@admin.register(GougeFeedback)
class GougeFeedbackAdmin(admin.ModelAdmin):
    list_display = ['feedback_id', 'gouge', 'user', 'created_at']
    search_fields = ['feedback_text', 'user__username']
    list_filter = ['created_at']

@admin.register(FlightCondition)
class FlightConditionAdmin(admin.ModelAdmin):
    list_display = ['name', 'category']
    list_filter = ['category']
    search_fields = ['name', 'description']
