from rest_framework import generics, permissions
from .models import Flashcard, FlashcardSet, FlashcardCategory
from .serializers import FlashcardSerializer, FlashcardSetSerializer, FlashcardCategorySerializer

class FlashcardSetList(generics.ListCreateAPIView):
    serializer_class = FlashcardSetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FlashcardSet.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FlashcardSetDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FlashcardSetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FlashcardSet.objects.filter(user=self.request.user)

class FlashcardList(generics.ListCreateAPIView):
    serializer_class = FlashcardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        set_id = self.kwargs['set_id']
        return Flashcard.objects.filter(set__user=self.request.user, set_id=set_id)

    def perform_create(self, serializer):
        set_id = self.kwargs['set_id']
        flashcard_set = FlashcardSet.objects.get(id=set_id, user=self.request.user)
        serializer.save(set=flashcard_set, user=self.request.user)

class FlashcardDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FlashcardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        set_id = self.kwargs['set_id']
        return Flashcard.objects.filter(set__user=self.request.user, set_id=set_id)

class FlashcardCategoryList(generics.ListCreateAPIView):
    serializer_class = FlashcardCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FlashcardCategory.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FlashcardCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FlashcardCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FlashcardCategory.objects.filter(user=self.request.user)