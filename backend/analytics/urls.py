from django.urls import path
from .views import UserActivityList, UserActivityDetail, PerformanceMetricList, PerformanceMetricDetail

urlpatterns = [
    path('user-activity/', UserActivityList.as_view(), name='user-activity-list'),
    path('user-activity/<int:pk>/', UserActivityDetail.as_view(), name='user-activity-detail'),
    path('performance-metrics/', PerformanceMetricList.as_view(), name='performance-metric-list'),
    path('performance-metrics/<int:pk>/', PerformanceMetricDetail.as_view(), name='performance-metric-detail'),
]