from django.contrib import admin
from django.urls import path, include
from api.views import welcome_page
from rest_framework.routers import DefaultRouter
from gouge.views import GougeViewSet
from .api import views

router = DefaultRouter()
router.register(r'gouges', GougeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('users/', include('users.urls')),
    path('profiles/', include('profiles.urls')),  # Add this line
    path('chat/', include('chat.urls')),  # Add this line
    path('mockoral/', include('mockoral.urls')),  # Add this line
    path('gouge/', include(router.urls)),
    path('flashcards/', include('flashcards.urls')),  # Add this line
    path('analytics/', include('analytics.urls')),  # Add this line
    path('admin-api/', include('admin.urls')),  # Add this line
    path('', welcome_page, name='welcome'),
    path('api/chat/weaviate', views.chat_weaviate, name='chat_weaviate'),
    path('api/mockoral/weaviate', views.mockoral_weaviate, name='mockoral_weaviate'),
]