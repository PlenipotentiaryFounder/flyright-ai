from django.urls import path
from .views import GougeList, GougeDetail

urlpatterns = [
    path('gouges/', GougeList.as_view(), name='gouge-list'),
    path('gouges/<int:pk>/', GougeDetail.as_view(), name='gouge-detail'),
]