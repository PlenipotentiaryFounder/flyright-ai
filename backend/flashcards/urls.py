from django.urls import path
from .views import FlashcardDeckList, FlashcardDeckDetail, FlashcardList, FlashcardDetail

urlpatterns = [
    path('decks/', FlashcardDeckList.as_view(), name='flashcard-deck-list'),
    path('decks/<int:pk>/', FlashcardDeckDetail.as_view(), name='flashcard-deck-detail'),
    path('decks/<int:deck_id>/flashcards/', FlashcardList.as_view(), name='flashcard-list'),
    path('decks/<int:deck_id>/flashcards/<int:pk>/', FlashcardDetail.as_view(), name='flashcard-detail'),
]