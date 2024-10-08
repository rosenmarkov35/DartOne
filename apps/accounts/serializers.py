from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth.models import User

from apps.accounts.models import GameHistory, UserStats


class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class SignInSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ('username', 'password')

    def validate(self, data):
        user = authenticate(username=data.get('username'), password=data.get('password'))
        if user is None:
            raise serializers.ValidationError('Invalid credentials')
        return data


class GameHistorySerializer(serializers.ModelSerializer):
    avg_leg = serializers.DecimalField(max_digits=10, decimal_places=2, coerce_to_string=False)

    class Meta:
        model = GameHistory
        fields = ['user', 'game', 'total_turns', 'avg_game_throw', 'played_on', 'avg_leg']


class UserStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStats
        fields = ['user', 'games_played', 'avg_throw', 'avg_turns_per_game', 'all_turns', 'avg_leg']
