from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import Gouge
from datetime import date

User = get_user_model()

class GougeAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.client.force_authenticate(user=self.user)
        self.list_url = reverse('gouge-list')

    def test_create_gouge(self):
        data = {
            'examiner_name': 'John Doe',
            'date': '2023-01-01',
            'outcome': 'pass',
            'text': 'This is a test gouge.'
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Gouge.objects.count(), 1)
        self.assertEqual(Gouge.objects.get().examiner_name, 'John Doe')

    def test_list_gouges(self):
        Gouge.objects.create(user=self.user, examiner_name='Examiner 1', date=date.today(), outcome='pass', text='Gouge 1')
        Gouge.objects.create(user=self.user, examiner_name='Examiner 2', date=date.today(), outcome='fail', text='Gouge 2')
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_search_gouges(self):
        Gouge.objects.create(user=self.user, examiner_name='John Doe', date=date.today(), outcome='pass', text='Gouge about airspace')
        Gouge.objects.create(user=self.user, examiner_name='Jane Smith', date=date.today(), outcome='fail', text='Gouge about weather')
        
        response = self.client.get(f"{self.list_url}?search=John")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['examiner_name'], 'John Doe')

        response = self.client.get(f"{self.list_url}?search=weather")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['examiner_name'], 'Jane Smith')

    def test_update_gouge(self):
        gouge = Gouge.objects.create(user=self.user, examiner_name='Jane Doe', date=date.today(), outcome='pass', text='Original text')
        url = reverse('gouge-detail', kwargs={'pk': gouge.id})
        data = {'text': 'Updated text'}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        gouge.refresh_from_db()
        self.assertEqual(gouge.text, 'Updated text')

    def test_delete_gouge(self):
        gouge = Gouge.objects.create(user=self.user, examiner_name='Jane Doe', date=date.today(), outcome='pass', text='Test gouge')
        url = reverse('gouge-detail', kwargs={'pk': gouge.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Gouge.objects.count(), 0)