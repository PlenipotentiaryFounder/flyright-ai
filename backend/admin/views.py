from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import AuditLog
from .serializers import UserAdminSerializer, AuditLogSerializer
from mockoral.models import MockOralSession
from gouge.models import Gouge
from flashcards.models import FlashcardDeck, Flashcard
from analytics.models import UserActivity, PerformanceMetric
from mockoral.serializers import MockOralSessionSerializer
from gouge.serializers import GougeSerializer
from flashcards.serializers import FlashcardDeckSerializer, FlashcardSerializer
from analytics.serializers import UserActivitySerializer, PerformanceMetricSerializer
import logging
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q, Count, Avg  # Add this import
from rest_framework import filters
from django.core.cache import cache
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.utils import timezone
from datetime import timedelta

User = get_user_model()
logger = logging.getLogger(__name__)

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class UserAdminViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserAdminSerializer
    permission_classes = [IsAdminUser]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['username', 'email']
    ordering_fields = ['username', 'email', 'date_joined']

    def get_queryset(self):
        queryset = User.objects.all()
        is_staff = self.request.query_params.get('is_staff')
        is_active = self.request.query_params.get('is_active')

        if is_staff is not None:
            queryset = queryset.filter(is_staff=is_staff.lower() == 'true')
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')

        return queryset

    def perform_create(self, serializer):
        user = serializer.save()
        AuditLog.objects.create(user=self.request.user, action='Create User', details={'created_user_id': user.id})
        logger.info(f"Admin user {self.request.user.username} created user {user.username}")

    def perform_update(self, serializer):
        user = serializer.save()
        AuditLog.objects.create(user=self.request.user, action='Update User', details={'updated_user_id': user.id})
        logger.info(f"Admin user {self.request.user.username} updated user {user.username}")

    def perform_destroy(self, instance):
        AuditLog.objects.create(user=self.request.user, action='Delete User', details={'deleted_user_id': instance.id})
        logger.info(f"Admin user {self.request.user.username} deleted user {instance.username}")
        instance.delete()

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    permission_classes = [IsAdminUser]

class MockOralAdminViewSet(viewsets.ModelViewSet):
    queryset = MockOralSession.objects.all()
    serializer_class = MockOralSessionSerializer
    permission_classes = [IsAdminUser]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['examiner_name']

    def get_queryset(self):
        queryset = MockOralSession.objects.all()
        status = self.request.query_params.get('status')

        if status:
            queryset = queryset.filter(status=status)

        return queryset

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        mock_oral = self.get_object()
        mock_oral.status = 'approved'
        mock_oral.save()
        AuditLog.objects.create(user=request.user, action='Approve Mock Oral', details={'mock_oral_id': mock_oral.id})
        return Response({'status': 'mock oral approved'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        mock_oral = self.get_object()
        mock_oral.status = 'rejected'
        mock_oral.save()
        AuditLog.objects.create(user=request.user, action='Reject Mock Oral', details={'mock_oral_id': mock_oral.id})
        return Response({'status': 'mock oral rejected'})

class GougeAdminViewSet(viewsets.ModelViewSet):
    queryset = Gouge.objects.all()
    serializer_class = GougeSerializer
    permission_classes = [IsAdminUser]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['examiner_name', 'text']

    def get_queryset(self):
        queryset = Gouge.objects.all()
        outcome = self.request.query_params.get('outcome')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')

        if outcome:
            queryset = queryset.filter(outcome=outcome)
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)

        return queryset

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        gouge = self.get_object()
        gouge.status = 'approved'
        gouge.save()
        AuditLog.objects.create(user=request.user, action='Approve Gouge', details={'gouge_id': gouge.id})
        return Response({'status': 'gouge approved'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        gouge = self.get_object()
        gouge.status = 'rejected'
        gouge.save()
        AuditLog.objects.create(user=request.user, action='Reject Gouge', details={'gouge_id': gouge.id})
        return Response({'status': 'gouge rejected'})

class FlashcardDeckAdminViewSet(viewsets.ModelViewSet):
    queryset = FlashcardDeck.objects.all()
    serializer_class = FlashcardDeckSerializer
    permission_classes = [IsAdminUser]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

    def get_queryset(self):
        queryset = FlashcardDeck.objects.all()
        min_cards = self.request.query_params.get('min_cards')
        max_cards = self.request.query_params.get('max_cards')

        if min_cards:
            queryset = queryset.filter(flashcard_count__gte=min_cards)
        if max_cards:
            queryset = queryset.filter(flashcard_count__lte=max_cards)

        return queryset

class FlashcardAdminViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
    permission_classes = [IsAdminUser]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['question', 'answer']

    def get_queryset(self):
        deck_id = self.request.query_params.get('deck_id')
        queryset = Flashcard.objects.all()
        
        if deck_id:
            queryset = queryset.filter(deck_id=deck_id)
        
        return queryset

class AnalyticsAdminViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAdminUser]

    @action(detail=False)
    def user_activities(self, request):
        activities = UserActivity.objects.all()
        serializer = UserActivitySerializer(activities, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def performance_metrics(self, request):
        metrics = PerformanceMetric.objects.values('metric_type').annotate(avg_value=Avg('value')).order_by('-avg_value')
        return Response(metrics)

    @action(detail=False)
    def user_growth(self, request):
        last_month = timezone.now() - timedelta(days=30)
        user_growth = User.objects.filter(date_joined__gte=last_month).extra(
            {'date': "date(date_joined)"}
        ).values('date').annotate(count=Count('id')).order_by('date')
        return Response(user_growth)

class DashboardViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminUser]

    @method_decorator(cache_page(60 * 15))  # Cache for 15 minutes
    @action(detail=False, methods=['get'])
    def summary(self, request):
        now = timezone.now()
        last_week = now - timedelta(days=7)

        user_count = User.objects.count()
        new_users_last_week = User.objects.filter(date_joined__gte=last_week).count()
        
        mock_oral_count = MockOralSession.objects.count()
        mock_oral_last_week = MockOralSession.objects.filter(created_at__gte=last_week).count()
        
        gouge_count = Gouge.objects.count()
        gouge_last_week = Gouge.objects.filter(created_at__gte=last_week).count()
        
        flashcard_deck_count = FlashcardDeck.objects.count()
        flashcard_count = Flashcard.objects.count()

        return Response({
            'total_users': user_count,
            'new_users_last_week': new_users_last_week,
            'total_mock_orals': mock_oral_count,
            'new_mock_orals_last_week': mock_oral_last_week,
            'total_gouges': gouge_count,
            'new_gouges_last_week': gouge_last_week,
            'total_flashcard_decks': flashcard_deck_count,
            'total_flashcards': flashcard_count,
        })

    @action(detail=False, methods=['get'])
    def user_activity(self, request):
        activities = UserActivity.objects.values('activity_type').annotate(count=Count('id')).order_by('-count')
        return Response(activities)

    @action(detail=False, methods=['get'])
    def performance_metrics(self, request):
        metrics = PerformanceMetric.objects.values('metric_type').annotate(avg_value=Avg('value')).order_by('-avg_value')
        return Response(metrics)