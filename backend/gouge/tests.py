from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Gouge
from datetime import date

User = get_user_model()

class GougeTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.client.force_authenticate(user=self.user)

    def test_create_gouge(self):
        data = {
            'examiner_name': 'John Doe',
            'date': '2023-01-01',
            'outcome': 'pass',
            'text': 'This is a test gouge.'
        }
        response = self.client.post('/gouge/gouges/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Gouge.objects.count(), 1)
        self.assertEqual(Gouge.objects.get().examiner_name, 'John Doe')

    def test_retrieve_gouges(self):
        Gouge.objects.create(user=self.user, examiner_name='Examiner 1', date=date.today(), outcome='pass', text='Gouge 1')
        Gouge.objects.create(user=self.user, examiner_name='Examiner 2', date=date.today(), outcome='fail', text='Gouge 2')
        response = self.client.get('/gouge/gouges/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_update_gouge(self):
        gouge = Gouge.objects.create(user=self.user, examiner_name='Jane Doe', date=date.today(), outcome='pass', text='Original text')
        data = {'text': 'Updated text'}
        response = self.client.patch(f'/gouge/gouges/{gouge.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        gouge.refresh_from_db()
        self.assertEqual(gouge.text, 'Updated text')

    def test_delete_gouge(self):
        gouge = Gouge.objects.create(user=self.user, examiner_name='Jane Doe', date=date.today(), outcome='pass', text='Test gouge')
        response = self.client.delete(f'/gouge/gouges/{gouge.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Gouge.objects.count(), 0)