import logging
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import MockOralSession
from .serializers import MockOralSessionSerializer

logger = logging.getLogger(__name__)

class MockOralSessionList(generics.ListCreateAPIView):
    serializer_class = MockOralSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MockOralSession.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
            logger.info(f"Mock Oral Session created for user {self.request.user.username}")
        except Exception as e:
            logger.error(f"Error creating Mock Oral Session: {str(e)}")
            raise

class MockOralSessionDetail(generics.RetrieveUpdateAPIView):
    serializer_class = MockOralSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MockOralSession.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        try:
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            if 'score' in request.data:
                score = int(request.data['score'])
                instance.status = 'pass' if score >= 70 else 'fail'
                instance.save()

            logger.info(f"Mock Oral Session {instance.id} updated for user {request.user.username}")
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error updating Mock Oral Session: {str(e)}")
            return Response({"error": "An error occurred while updating the session."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)