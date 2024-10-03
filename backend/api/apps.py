from django.apps import AppConfig
from django.core.signals import request_finished

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        pass  # Remove the connection to close_weaviate_client
