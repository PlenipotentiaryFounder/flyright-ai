from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ConversationViewSet,
    WeaviateSearchViewSet,
    RegisterView,
    LoginView,
    welcome_page,
    MessageView,
    chat_weaviate,
    mockoral_weaviate
)
from flashcards.views import FlashcardViewSet, FlashcardCategoryViewSet, FlashcardSetViewSet
from chat.views import ConversationViewSet, MessageView
from gouge.views import GougeList, GougeDetail
from mockoral.views import MockOralSessionList, MockOralSessionDetail
from profiles.views import ProfileDetailView
from analytics.views import UserActivityList, UserActivityDetail, PerformanceMetricList, PerformanceMetricDetail


router = DefaultRouter()

# Flashcards
router.register(r'flashcards', FlashcardViewSet)
router.register(r'flashcard-categories', FlashcardCategoryViewSet)
router.register(r'flashcard-sets', FlashcardSetViewSet)

# Chat
router.register(r'conversations', ConversationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', welcome_page, name='welcome'),
    path('weaviate/search', MessageView.as_view(), name='weaviate-search'),
    path('welcome/', welcome_page, name='welcome'),
    path('chat/', chat_weaviate, name='chat-weaviate'),
    path('mockoral/', mockoral_weaviate, name='mockoral-weaviate'),
    path('message/', MessageView.as_view(), name='message'),
    
    # Gouge
    path('gouges/', GougeList.as_view(), name='gouge-list'),
    path('gouges/<int:pk>/', GougeDetail.as_view(), name='gouge-detail'),
    
    # Mock Oral
    path('mockoral/sessions/', MockOralSessionList.as_view(), name='mockoral-session-list'),
    path('mockoral/sessions/<int:pk>/', MockOralSessionDetail.as_view(), name='mockoral-session-detail'),
    
    # Profiles
    path('profiles/', ProfileDetailView.as_view(), name='profile-detail'),
    
    # Analytics
    path('analytics/user-activity/', UserActivityList.as_view(), name='user-activity-list'),
    path('analytics/user-activity/<int:pk>/', UserActivityDetail.as_view(), name='user-activity-detail'),
    path('analytics/performance-metrics/', PerformanceMetricList.as_view(), name='performance-metric-list'),
    path('analytics/performance-metrics/<int:pk>/', PerformanceMetricDetail.as_view(), name='performance-metric-detail'),
    
    # Additional paths for Flashcard Categories and Sets
    path('flashcard-categories/', FlashcardCategoryViewSet.as_view({'get': 'list'}), name='flashcard-category-list'),
    path('flashcard-sets/', FlashcardSetViewSet.as_view({'get': 'list'}), name='flashcard-set-list'),
   
]