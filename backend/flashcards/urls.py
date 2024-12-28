from django.urls import path
from . import views

urlpatterns = [
    path('flashcard-categories/', views.FlashcardCategoryList.as_view(), name='flashcard-category-list'),
    path('flashcard-sets/', views.FlashcardSetList.as_view(), name='flashcard-set-list'),
]