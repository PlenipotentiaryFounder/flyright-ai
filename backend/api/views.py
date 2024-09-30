from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def test_api(request):
    return Response({"message": "Hello from Django!"})

# Create your views here.

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import logging

logger = logging.getLogger('api')

def welcome_page(request):
    return render(request, 'index.html')  # Ensure 'index.html' is the entry point of your React app

# New API views for managing conversations and integrating Weaviate

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Conversation, Message, Flashcard  # Use relative imports
from .serializers import ConversationSerializer, MessageSerializer, FlashcardSerializer  # Use relative imports
from .services.weaviate_service import search_weaviate  # Use relative imports
from django.contrib.auth.models import User


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

    def get_queryset(self):
        # Remove or correct the filtering by the 'user' field
        # If you need to filter by the current user, ensure the model has a 'user' field
        # return self.queryset.filter(user=self.request.user)
        return self.queryset

    @action(detail=True, methods=['post'])
    def add_message(self, request, pk=None):
        logger.debug('Adding message to conversation: %s', pk)
        conversation = self.get_object()
        message = Message.objects.create(
            conversation=conversation,
            sender=request.data['sender'],
            content=request.data['content']
        )
        logger.debug('Message added: %s', message)
        return Response(MessageSerializer(message).data, status=status.HTTP_201_CREATED)

class WeaviateSearchViewSet(viewsets.ViewSet):
    def create(self, request):
        return Response({"message": "Weaviate search is not available in development mode"}, status=200)

def create_conversation(request):
    logger.debug('Creating a new conversation')
    # Your existing code to create a conversation
    # ...
    logger.debug('Conversation created successfully')

def create_message(request):
    logger.debug('Creating a new message')
    # Your existing code to create a message
    # ...
    logger.debug('Message created successfully')

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Conversation, Message
from .serializers import MessageSerializer
import weaviate

class MessageView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        query = data.get('query')
        if not query:
            return Response({'error': 'Query is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Use the valid conversation ID you noted earlier
        conversation_id = 1  # Replace with the actual ID of the conversation you created
        try:
            conversation = Conversation.objects.get(id=conversation_id)
        except Conversation.DoesNotExist:
            return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)

        # Save the message to the database
        message = Message(content=query, sender='user', conversation=conversation)
        message.save()

        # Process the message with Weaviate
        return Response({'message': 'Message received, but Weaviate processing is not available in development mode'}, status=status.HTTP_200_OK)

    def query_weaviate(self, query):
        return {"message": "Weaviate query is not available in development mode"}

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import weaviate

client = None  # or create a dummy client if needed

@csrf_exempt
@require_http_methods(["POST"])
def chat_weaviate(request):
    return JsonResponse({'message': 'Weaviate integration is not available in development mode'}, status=200)

@csrf_exempt
@require_http_methods(["POST"])
def mockoral_weaviate(request):
    return JsonResponse({'message': 'Weaviate integration is not available in development mode'}, status=200)

# ... other imports
from rest_framework import viewsets
from .models import Flashcard
from .serializers import FlashcardSerializer

class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
