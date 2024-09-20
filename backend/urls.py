from django.urls import path
from .views import save_selection

urlpatterns = [
    # other paths
    path('api/save-selection/', save_selection, name='save_selection'),
]