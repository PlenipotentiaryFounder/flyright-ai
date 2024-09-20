from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json

@csrf_exempt
@login_required
def save_selection(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = request.user
        user.profile.journey = data.get('journey', '')
        user.profile.save()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False}, status=400)