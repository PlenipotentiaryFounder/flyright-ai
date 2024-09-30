from django.urls import path
from .views import MockOralSessionList, MockOralSessionDetail

urlpatterns = [
    path('sessions/', MockOralSessionList.as_view(), name='mockoral-session-list'),
    path('sessions/<int:pk>/', MockOralSessionDetail.as_view(), name='mockoral-session-detail'),
]