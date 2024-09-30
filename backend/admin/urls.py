from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserAdminViewSet, AuditLogViewSet, MockOralAdminViewSet,
    GougeAdminViewSet, FlashcardDeckAdminViewSet, FlashcardAdminViewSet,
    AnalyticsAdminViewSet, DashboardViewSet
)
from .auth import AdminTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'users', UserAdminViewSet)
router.register(r'audit-logs', AuditLogViewSet)
router.register(r'mock-orals', MockOralAdminViewSet)
router.register(r'gouges', GougeAdminViewSet)
router.register(r'flashcard-decks', FlashcardDeckAdminViewSet)
router.register(r'flashcards', FlashcardAdminViewSet)
router.register(r'analytics', AnalyticsAdminViewSet, basename='analytics')
router.register(r'dashboard', DashboardViewSet, basename='dashboard')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', AdminTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]