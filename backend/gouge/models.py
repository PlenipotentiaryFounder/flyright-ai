from django.db import models
from django.conf import settings
from users.models import CustomUser
from django.contrib.postgres.fields import ArrayField

CHECKRIDE_TYPES = [
    ('PPL', 'Private Pilot License'),
    ('IFR', 'Instrument Flight Rules'),
    ('CPL', 'Commercial Pilot License'),
    ('CFI', 'Certified Flight Instructor'),
    ('CFII', 'Certified Flight Instructor Instrument'),
    ('MEI', 'Multi-Engine Instructor'),
    ('CPC', 'Certified Professional Controller'),
    ('ATP', 'Airline Transport Pilot'),
]

AVIONICS_TYPES = [
    ('SIX_PACK', 'Six Pack'),
    ('GLASS', 'Glass Cockpit'),
    ('HYBRID', 'Hybrid'),
]

FLIGHT_CONDITIONS = [
    # Weather
    ('VFR', 'Visual Flight Rules'),
    ('MVFR', 'Marginal VFR'),
    ('IFR', 'Instrument Flight Rules'),
    ('LIFR', 'Low IFR'),
    
    # Turbulence
    ('LIGHT_TURB', 'Light Turbulence'),
    ('MOD_TURB', 'Moderate Turbulence'),
    ('SEV_TURB', 'Severe Turbulence'),
    
    # Wind Conditions
    ('LIGHT_WIND', 'Light Winds (0-10 kts)'),
    ('MOD_WIND', 'Moderate Winds (10-20 kts)'),
    ('STRONG_WIND', 'Strong Winds (20+ kts)'),
    ('CROSSWIND', 'Crosswind Component'),
    ('WIND_SHEAR', 'Wind Shear'),
    ('GUSTING', 'Gusting Conditions'),
    
    # Visibility/Ceiling
    ('CLEAR', 'Clear Skies'),
    ('SCATTERED', 'Scattered Clouds'),
    ('BROKEN', 'Broken Clouds'),
    ('OVERCAST', 'Overcast'),
    ('LOW_CEILING', 'Low Ceiling'),
    ('FOG', 'Foggy Conditions'),
    ('RAIN', 'Rain'),
    ('SNOW', 'Snow'),
    ('ICING', 'Icing Conditions'),
    
    # Other
    ('NIGHT', 'Night Conditions'),
    ('MOUNTAIN', 'Mountain Operations'),
    ('HIGH_DA', 'High Density Altitude'),
    ('HOT_TEMP', 'High Temperature'),
    ('COLD_TEMP', 'Cold Temperature')
]

class ExaminerProfile(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    contact_info = models.CharField(max_length=255, null=True, blank=True)
    organization = models.CharField(max_length=255, null=True, blank=True)
    years_of_experience = models.IntegerField()
    avg_rating = models.FloatField(default=0)
    feedback_count = models.IntegerField(default=0)
    avg_pass_rate = models.FloatField(default=0)
    avg_flight_difficulty = models.FloatField(default=0)
    avg_oral_difficulty = models.FloatField(default=0)

    def __str__(self):
        return self.name

class AircraftType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=50)  # e.g., Single Engine, Multi Engine, etc.

    def __str__(self):
        return self.name

class OralTopic(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    checkride_types =  models.CharField(max_length=10, choices=CHECKRIDE_TYPES, default='PPL')

    def __str__(self):
        return self.name

class FlightManeuver(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    checkride_types =  models.CharField(max_length=10, choices=CHECKRIDE_TYPES, default='PPL')
    def __str__(self):
        return self.name

class FlightCondition(models.Model):
    name = models.CharField(max_length=100, choices=FLIGHT_CONDITIONS, unique=True)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=50, choices=[
        ('WEATHER', 'Weather Conditions'),
        ('VISIBILITY', 'Visibility Conditions'),
        ('WIND', 'Wind Conditions'),
        ('OTHER', 'Other Conditions')
    ])

    def __str__(self):
        return self.get_name_display()  # This will show the human-readable version

class Gouge(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    examiner = models.ForeignKey(ExaminerProfile, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    gouge_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    rating = models.IntegerField(default=3)
    pass_or_fail = models.CharField(choices=[('pass', 'Pass'), ('fail', 'Fail')], max_length=10)
    flight_difficulty = models.IntegerField(choices=[(1, 'Easy'), (2, 'Moderate'), (3, 'Hard')], default=2)
    oral_difficulty = models.IntegerField(choices=[(1, 'Easy'), (2, 'Moderate'), (3, 'Hard')], default=2)
    stress_level = models.IntegerField(default=3)
    unexpected_elements = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=255, default='')
    aircraft_type = models.ForeignKey(AircraftType, on_delete=models.SET_NULL, null=True)
    avionics_type = models.CharField(max_length=20, choices=AVIONICS_TYPES, default='GLASS')
    flyright_used = models.BooleanField(default=False)
    flight_hours = models.FloatField(default=0.0)
    oral_duration = models.IntegerField(default=0)  # Duration in minutes
    flight_duration = models.IntegerField(default=0)  # Duration in minutes
    checkride_type = models.CharField(max_length=10, choices=CHECKRIDE_TYPES, default='PPL')
    
    # First Impressions
    examiner_explanation = models.TextField(default='')
    examiner_behavior = models.TextField(default='')
    examiner_professionalism = models.IntegerField(choices=[(1, 'Poor'), (2, 'Fair'), (3, 'Good'), (4, 'Excellent')], default=3)
    
    # Oral Exam Details
    oral_topics = models.ManyToManyField(OralTopic)
    oral_pass = models.BooleanField(default=False)
    oral_difficult_topics = models.JSONField(default=dict)  # Array of difficult topic IDs
    
    # Flight Exam Details
    flight_maneuvers = models.ManyToManyField(FlightManeuver)
    flight_pass = models.BooleanField(default=False)
    maneuver_ratings = models.JSONField(default=dict)  # Map of maneuver IDs to ratings
    flight_conditions = models.ManyToManyField(FlightCondition, blank=True)
    
    # Additional Details
    examiner_focus = models.TextField(default='')  # Specific topics emphasized
    preparation_tips = models.TextField(default='')
    stress_management_tips = models.TextField(default='')
    general_feedback = models.TextField(default='')

class GougeFeedback(models.Model):
    feedback_id = models.AutoField(primary_key=True)
    gouge = models.ForeignKey(Gouge, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    feedback_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)