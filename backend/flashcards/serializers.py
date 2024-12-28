from rest_framework import serializers
from .models import Flashcard, FlashcardSet, FlashcardCategory

class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['id', 'set', 'question', 'answer', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class FlashcardSetSerializer(serializers.ModelSerializer):
    flashcards = FlashcardSerializer(many=True, read_only=True)

    class Meta:
        model = FlashcardSet   
        fields = ['id', 'user', 'name', 'description', 'flashcards', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class FlashcardCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FlashcardCategory
        fields = ['id', 'name', 'creatorType', 'ai_generated', 'user']
        read_only_fields = ['id']