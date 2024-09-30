from rest_framework.test import APITestCase
from django.urls import reverse
from .models import Scenario, Question, Report, Examiner
from django.contrib.auth.models import User

class ScenarioTests(APITestCase):
    def test_create_scenario(self):
        url = reverse('scenario-list')
        data = {'title': 'Test Scenario', 'description': 'Test Description', 'stage': 'Private Pilot', 'topic': 'General'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_get_scenarios(self):
        url = reverse('scenario-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)

# Add more tests for other models and views