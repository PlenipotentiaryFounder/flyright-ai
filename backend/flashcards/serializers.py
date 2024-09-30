from rest_framework import serializers
from .models import Flashcard, FlashcardDeck

class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['id', 'deck', 'question', 'answer', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class FlashcardDeckSerializer(serializers.ModelSerializer):
    flashcards = FlashcardSerializer(many=True, read_only=True)

    class Meta:
        model = FlashcardDeck
        fields = ['id', 'user', 'name', 'description', 'flashcards', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']