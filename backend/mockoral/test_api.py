from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import MockOralSession

User = get_user_model()

class MockOralAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.client.force_authenticate(user=self.user)
        self.list_url = reverse('mockoral-session-list')

    def test_create_session(self):
        data = {
            'examiner_name': 'John Doe',
            'topics_covered': 'Airspace, Weather',
            'questions_asked': 'What are the different classes of airspace?'
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MockOralSession.objects.count(), 1)
        self.assertEqual(MockOralSession.objects.get().examiner_name, 'John Doe')

    def test_list_sessions(self):
        MockOralSession.objects.create(user=self.user, examiner_name='Examiner 1')
        MockOralSession.objects.create(user=self.user, examiner_name='Examiner 2')
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_update_session(self):
        session = MockOralSession.objects.create(user=self.user, examiner_name='Jane Doe')
        url = reverse('mockoral-session-detail', kwargs={'pk': session.id})
        data = {
            'score': 75,
            'topics_covered': 'Regulations, Navigation',
            'questions_asked': 'What are the requirements for night flying?'
        }
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        session.refresh_from_db()
        self.assertEqual(session.score, 75)
        self.assertEqual(session.status, 'pass')

    def test_delete_session(self):
        session = MockOralSession.objects.create(user=self.user, examiner_name='Jane Doe')
        url = reverse('mockoral-session-detail', kwargs={'pk': session.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(MockOralSession.objects.count(), 0)