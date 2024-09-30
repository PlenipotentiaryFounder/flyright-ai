from django.contrib.auth import get_user_model
from rest_framework import generics
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login as auth_login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import logging

User = get_user_model()

logger = logging.getLogger('api')

# Placeholder for user-related views

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(View):
    def post(self, request):
        logger.debug('RegisterView POST request received')
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            logger.debug('User registered successfully')
            return JsonResponse({'success': True, 'message': 'User registered successfully'})
        sanitized_errors = {field: error[0] for field, error in form.errors.items()}
        logger.debug(f'Registration errors: {sanitized_errors}')
        return JsonResponse({'success': False, 'errors': sanitized_errors})

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        logger.debug('LoginView POST request received')
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            logger.debug('User logged in successfully')
            return JsonResponse({'success': True, 'message': 'User logged in successfully'})
        sanitized_errors = {field: error[0] for field, error in form.errors.items()}
        logger.debug(f'Login errors: {sanitized_errors}')
        return JsonResponse({'success': False, 'errors': sanitized_errors})