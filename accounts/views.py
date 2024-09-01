from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


@require_http_methods(["POST"])
def signup(request):
    # Parse the incoming JSON data
    data = json.loads(request.body)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if all required fields are provided
    if not all([username, email, password]):
        return JsonResponse({'message': 'Please provide all required fields'}, status=400)

    # Validate the password
    try:
        validate_password(password)
    except ValidationError as e:
        return JsonResponse({'message': str(e)}, status=400)

    # Check if the username already exists
    if User.objects.filter(username=username).exists():
        return JsonResponse({'message': 'Username already exists'}, status=400)

    # Check if the email already exists
    if User.objects.filter(email=email).exists():
        return JsonResponse({'message': 'Email already exists'}, status=400)

    # Create the new user
    user = User.objects.create_user(username=username, email=email, password=password)
    return JsonResponse({'message': 'User created successfully'}, status=201)
