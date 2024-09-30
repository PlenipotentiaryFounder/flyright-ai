from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from .models import Flashcard, FlashcardDeck
from .serializers import FlashcardSerializer, FlashcardDeckSerializer
import logging

logger = logging.getLogger(__name__)

class FlashcardDeckList(generics.ListCreateAPIView):
    serializer_class = FlashcardDeckSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FlashcardDeck.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
            logger.info(f"Flashcard deck created by user {self.request.user.username}")
        except Exception as e:
            logger.error(f"Error creating flashcard deck: {str(e)}")
            raise

class FlashcardDeckDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FlashcardDeckSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FlashcardDeck.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        try:
            serializer.save()
            logger.info(f"Flashcard deck {serializer.instance.id} updated by user {self.request.user.username}")
        except Exception as e:
            logger.error(f"Error updating flashcard deck: {str(e)}")
            raise

    def perform_destroy(self, instance):
        try:
            logger.info(f"Flashcard deck {instance.id} deleted by user {self.request.user.username}")
            instance.delete()
        except Exception as e:
            logger.error(f"Error deleting flashcard deck: {str(e)}")
            raise

class FlashcardList(generics.ListCreateAPIView):
    serializer_class = FlashcardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        deck_id = self.kwargs['deck_id']
        return Flashcard.objects.filter(deck__user=self.request.user, deck_id=deck_id)

    def perform_create(self, serializer):
        try:
            deck_id = self.kwargs['deck_id']
            deck = FlashcardDeck.objects.get(id=deck_id, user=self.request.user)
            serializer.save(deck=deck)
            logger.info(f"Flashcard created in deck {deck.name} by user {self.request.user.username}")
        except ObjectDoesNotExist:
            logger.error(f"Flashcard deck not found: {deck_id}")
            raise
        except Exception as e:
            logger.error(f"Error creating flashcard: {str(e)}")
            raise

class FlashcardDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FlashcardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        deck_id = self.kwargs['deck_id']
        return Flashcard.objects.filter(deck__user=self.request.user, deck_id=deck_id)

    def perform_update(self, serializer):
        try:
            serializer.save()
            logger.info(f"Flashcard {serializer.instance.id} updated by user {self.request.user.username}")
        except Exception as e:
            logger.error(f"Error updating flashcard: {str(e)}")
            raise

    def perform_destroy(self, instance):
        try:
            logger.info(f"Flashcard {instance.id} deleted by user {self.request.user.username}")
            instance.delete()
        except Exception as e:
            logger.error(f"Error deleting flashcard: {str(e)}")
            raise