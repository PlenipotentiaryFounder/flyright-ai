from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods  # Add this import
from django.utils.decorators import method_decorator
from django.views import View
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.views import APIView

from chat.models import Conversation, Message
from flashcards.models import Flashcard
from .serializers import ConversationSerializer, MessageSerializer, FlashcardSerializer
from .services.weaviate_service import search_weaviate, chat_with_weaviate, mockoral_with_weaviate

import logging
import json
import weaviate

logger = logging.getLogger('api')

# Keep all your original view functions and classes...

@api_view(['GET'])
def test_api(request):
    return Response({"message": "Hello from Django!"})

def welcome_page(request):
    return render(request, 'index.html')

class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

    def get_queryset(self):
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
    def list(self, request):
        query = request.query_params.get('query', '')
        results = search_weaviate(query)
        return Response(results)

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

class MessageView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        query = data.get('query')
        if not query:
            return Response({'error': 'Query is required'}, status=status.HTTP_400_BAD_REQUEST)

        conversation_id = 1  # Replace with the actual ID of the conversation you created
        try:
            conversation = Conversation.objects.get(id=conversation_id)
        except Conversation.DoesNotExist:
            return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)

        message = Message(content=query, sender='user', conversation=conversation)
        message.save()

        return Response({'message': 'Message received, but Weaviate processing is not available in development mode'}, status=status.HTTP_200_OK)

    def query_weaviate(self, query):
        return {"message": "Weaviate query is not available in development mode"}

client = None  # or create a dummy client if needed

@csrf_exempt
@require_http_methods(["POST"])
def chat_weaviate(request):
    data = json.loads(request.body)
    message = data.get('message', '')
    response = chat_with_weaviate(message)
    return JsonResponse(response)

@csrf_exempt
@require_http_methods(["POST"])
def mockoral_weaviate(request):
    data = json.loads(request.body)
    question = data.get('question', '')
    response = mockoral_with_weaviate(question)
    return JsonResponse(response)

class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
