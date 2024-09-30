from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Profile

User = get_user_model()

class ProfileTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.client.force_authenticate(user=self.user)

    def test_profile_creation(self):
        """Test that a profile is created for each new user"""
        self.assertTrue(Profile.objects.filter(user=self.user).exists())

    def test_retrieve_profile(self):
        """Test retrieving a user's profile"""
        response = self.client.get('/profiles/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user'], self.user.id)

    def test_update_profile(self):
        """Test updating a user's profile"""
        payload = {'bio': 'New bio', 'location': 'New location'}
        response = self.client.patch('/profiles/', payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['bio'], payload['bio'])
        self.assertEqual(response.data['location'], payload['location'])