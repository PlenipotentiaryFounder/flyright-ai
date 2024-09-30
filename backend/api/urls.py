from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ConversationViewSet, WeaviateSearchViewSet, RegisterView, LoginView, welcome_page, MessageView

router = DefaultRouter()
router.register(r'conversations', ConversationViewSet)
router.register(r'weaviate/search', WeaviateSearchViewSet, basename='weaviate-search')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', welcome_page, name='welcome'),
    path('weaviate/search', MessageView.as_view(), name='weaviate-search'),
]
