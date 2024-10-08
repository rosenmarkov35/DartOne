from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import GameHistory
from .serializers import SignUpSerializer, SignInSerializer, GameHistorySerializer, UserStatsSerializer


class SignUpView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            # Perform user creation or other logic here
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignInView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = SignInSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=serializer.validated_data['username'],
                                password=serializer.validated_data['password'])

            if user is not None:
                login(request, user)
                return Response({"detail": "Successfully signed in"}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignOutView(APIView):

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"detail": "Successfully signed out"}, status=status.HTTP_200_OK)


class CheckAuthView(APIView):
    def get(self, request, *args, **kwargs):
        # Check if the user is authenticated
        if request.user and request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': True})
        return JsonResponse({'isAuthenticated': False})


class SaveGameView(APIView):

    def post(self, request, *args, **kwargs):
        total_turns = request.data.get('totalTurns')
        game_turns = request.data.get('history')
        avg_game_throw = request.data.get('avgGameThrow')
        avg_leg = request.data.get('avgLeg')

        GameHistory.objects.create(user=request.user, total_turns=total_turns, game=game_turns,
                                   avg_game_throw=avg_game_throw, avg_leg=avg_leg)
        request.user.user_stats.update_stats()
        return Response({"detail": "Game added successfully"}, status=status.HTTP_201_CREATED)


class GetDetailsView(APIView):
    def get(self, request, *args, **kwargs):
        all_games = request.user.user_history.all()
        all_stats = request.user.user_stats

        games_serializer = GameHistorySerializer(all_games, many=True)
        stats_serializer = UserStatsSerializer(all_stats)

        return Response({
            'all_games': games_serializer.data,
            'all_stats': stats_serializer.data,
            'username': request.user.username,
        })
