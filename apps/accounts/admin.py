from django.contrib import admin

from apps.accounts.models import GameHistory, UserStats


@admin.register(GameHistory)
class GameHistoryAdmin(admin.ModelAdmin):
    list_display = ['user', 'total_turns', 'game']


@admin.register(UserStats)
class UserStatsAdmin(admin.ModelAdmin):
    list_display = ['user', 'games_played', 'all_turns']
