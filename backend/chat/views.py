from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer
import logging

logger = logging.getLogger('api')

class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

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

class MessageView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        query = data.get('query')
        if not query:
            return Response({'error': 'Query is required'}, status=status.HTTP_400_BAD_REQUEST)

        conversation_id = data.get('conversation_id')
        try:
            conversation = Conversation.objects.get(id=conversation_id, user=request.user)
        except Conversation.DoesNotExist:
            return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)

        message = Message(content=query, sender='user', conversation=conversation)
        message.save()

        # Here you would process the message and generate an AI response
        # For now, we'll just echo the user's message
        ai_response = f"AI response to: {query}"
        ai_message = Message(content=ai_response, sender='ai', conversation=conversation)
        ai_message.save()

        return Response({
            'user_message': MessageSerializer(message).data,
            'ai_message': MessageSerializer(ai_message).data
        }, status=status.HTTP_201_CREATED)