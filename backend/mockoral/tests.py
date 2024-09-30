from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import MockOralSession

User = get_user_model()

class MockOralTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.client.force_authenticate(user=self.user)

    def test_create_mock_oral_session(self):
        data = {
            'examiner_name': 'John Doe',
            'topics_covered': 'Airspace, Weather',
            'questions_asked': 'What are the different classes of airspace?'
        }
        response = self.client.post('/mockoral/sessions/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MockOralSession.objects.count(), 1)
        self.assertEqual(MockOralSession.objects.get().examiner_name, 'John Doe')

    def test_update_mock_oral_session(self):
        session = MockOralSession.objects.create(user=self.user, examiner_name='Jane Doe')
        data = {
            'score': 75,
            'topics_covered': 'Regulations, Navigation',
            'questions_asked': 'What are the requirements for night flying?'
        }
        response = self.client.patch(f'/mockoral/sessions/{session.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        session.refresh_from_db()
        self.assertEqual(session.score, 75)
        self.assertEqual(session.status, 'pass')

    def test_list_mock_oral_sessions(self):
        MockOralSession.objects.create(user=self.user, examiner_name='Examiner 1')
        MockOralSession.objects.create(user=self.user, examiner_name='Examiner 2')
        response = self.client.get('/mockoral/sessions/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)