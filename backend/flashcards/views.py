from rest_framework import viewsets, permissions
from .models import Flashcard, FlashcardSet, FlashcardCategory
from .serializers import FlashcardSerializer, FlashcardSetSerializer, FlashcardCategorySerializer

class FlashcardSetViewSet(viewsets.ModelViewSet):
    queryset = FlashcardSet.objects.all()
    serializer_class = FlashcardSetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FlashcardSet.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Flashcard.objects.filter(set__user=self.request.user)

    def perform_create(self, serializer):
        set_id = self.request.data.get('set')
        flashcard_set = FlashcardSet.objects.get(id=set_id, user=self.request.user)
        serializer.save(set=flashcard_set, user=self.request.user)

class FlashcardCategoryViewSet(viewsets.ModelViewSet):
    queryset = FlashcardCategory.objects.all()
    serializer_class = FlashcardCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FlashcardCategory.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
