from django.urls import path
from .views import RegisterView, LoginView, test_api, welcome_page

urlpatterns = [
    path('test/', test_api, name='test_api'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', welcome_page, name='welcome_page'),
]
