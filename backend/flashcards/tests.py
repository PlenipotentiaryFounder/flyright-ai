from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import FlashcardDeck, Flashcard

User = get_user_model()

class FlashcardTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.client.force_authenticate(user=self.user)

    def test_create_flashcard_deck(self):
        data = {
            'name': 'Test Deck',
            'description': 'This is a test deck'
        }
        response = self.client.post('/flashcards/decks/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FlashcardDeck.objects.count(), 1)
        self.assertEqual(FlashcardDeck.objects.get().name, 'Test Deck')

    def test_create_flashcard(self):
        deck = FlashcardDeck.objects.create(user=self.user, name='Test Deck')
        data = {
            'question': 'What is the capital of France?',
            'answer': 'Paris'
        }
        response = self.client.post(f'/flashcards/decks/{deck.id}/flashcards/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Flashcard.objects.count(), 1)
        self.assertEqual(Flashcard.objects.get().question, 'What is the capital of France?')

    def test_list_flashcard_decks(self):
        FlashcardDeck.objects.create(user=self.user, name='Deck 1')
        FlashcardDeck.objects.create(user=self.user, name='Deck 2')
        response = self.client.get('/flashcards/decks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_list_flashcards(self):
        deck = FlashcardDeck.objects.create(user=self.user, name='Test Deck')
        Flashcard.objects.create(deck=deck, question='Q1', answer='A1')
        Flashcard.objects.create(deck=deck, question='Q2', answer='A2')
        response = self.client.get(f'/flashcards/decks/{deck.id}/flashcards/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_update_flashcard_deck(self):
        deck = FlashcardDeck.objects.create(user=self.user, name='Old Name')
        data = {'name': 'New Name'}
        response = self.client.patch(f'/flashcards/decks/{deck.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        deck.refresh_from_db()
        self.assertEqual(deck.name, 'New Name')

    def test_update_flashcard(self):
        deck = FlashcardDeck.objects.create(user=self.user, name='Test Deck')
        flashcard = Flashcard.objects.create(deck=deck, question='Old Q', answer='Old A')
        data = {'question': 'New Q', 'answer': 'New A'}
        response = self.client.patch(f'/flashcards/decks/{deck.id}/flashcards/{flashcard.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        flashcard.refresh_from_db()
        self.assertEqual(flashcard.question, 'New Q')
        self.assertEqual(flashcard.answer, 'New A')

    def test_delete_flashcard_deck(self):
        deck = FlashcardDeck.objects.create(user=self.user, name='Test Deck')
        response = self.client.delete(f'/flashcards/decks/{deck.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(FlashcardDeck.objects.count(), 0)

    def test_delete_flashcard(self):
        deck = FlashcardDeck.objects.create(user=self.user, name='Test Deck')
        flashcard = Flashcard.objects.create(deck=deck, question='Q', answer='A')
        response = self.client.delete(f'/flashcards/decks/{deck.id}/flashcards/{flashcard.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Flashcard.objects.count(), 0)