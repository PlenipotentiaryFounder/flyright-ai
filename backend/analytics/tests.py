from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import UserActivity, PerformanceMetric

User = get_user_model()

class AnalyticsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.client.force_authenticate(user=self.user)

    def test_create_user_activity(self):
        data = {
            'activity_type': 'login',
            'details': {'ip_address': '127.0.0.1'}
        }
        response = self.client.post('/analytics/user-activity/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserActivity.objects.count(), 1)
        self.assertEqual(UserActivity.objects.get().activity_type, 'login')

    def test_create_performance_metric(self):
        data = {
            'metric_type': 'quiz_score',
            'value': 85.5
        }
        response = self.client.post('/analytics/performance-metrics/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PerformanceMetric.objects.count(), 1)
        self.assertEqual(PerformanceMetric.objects.get().metric_type, 'quiz_score')

    def test_list_user_activities(self):
        UserActivity.objects.create(user=self.user, activity_type='login')
        UserActivity.objects.create(user=self.user, activity_type='logout')
        response = self.client.get('/analytics/user-activity/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_list_performance_metrics(self):
        PerformanceMetric.objects.create(user=self.user, metric_type='quiz_score', value=85.5)
        PerformanceMetric.objects.create(user=self.user, metric_type='study_time', value=120)
        response = self.client.get('/analytics/performance-metrics/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_retrieve_user_activity(self):
        activity = UserActivity.objects.create(user=self.user, activity_type='login')
        response = self.client.get(f'/analytics/user-activity/{activity.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['activity_type'], 'login')

    def test_retrieve_performance_metric(self):
        metric = PerformanceMetric.objects.create(user=self.user, metric_type='quiz_score', value=85.5)
        response = self.client.get(f'/analytics/performance-metrics/{metric.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['metric_type'], 'quiz_score')