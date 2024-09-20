from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def test_api(request):
    return Response({"message": "Hello from Django!"})

# Create your views here.

from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login as auth_login, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(View):
    def post(self, request):
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            return JsonResponse({'success': True, 'message': 'User registered successfully'})
        sanitized_errors = {field: error[0] for field, error in form.errors.items()}  # Simplify errors
        return JsonResponse({'success': False, 'errors': sanitized_errors})

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            return JsonResponse({'success': True, 'message': 'User logged in successfully'})
        sanitized_errors = {field: error[0] for field, error in form.errors.items()}
        return JsonResponse({'success': False, 'errors': sanitized_errors})

def welcome_page(request):
    return render(request, 'index.html')  # Ensure 'index.html' is the entry point of your React app
