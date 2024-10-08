from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class GameHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_history')
    total_turns = models.IntegerField(default=0)
    game = models.JSONField(null=True)
    avg_game_throw = models.FloatField(null=False, blank=False, default=0)
    avg_leg = models.FloatField(null=False, blank=False, default=0)
    played_on = models.DateField(auto_now_add=True)


@receiver(post_save, sender=User)
def create_user_stats(sender, instance, created, **kwargs):
    if created:
        UserStats.objects.create(user=instance)
    else:
        pass


class UserStats(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_stats')
    games_played = models.IntegerField(default=0)
    avg_throw = models.FloatField(default=0.0)
    avg_turns_per_game = models.FloatField(default=0.0)
    all_turns = models.IntegerField(default=0)
    avg_leg = models.FloatField(default=0.0)

    def update_stats(self):
        games_played = self.user.user_history.all()

        self.games_played = games_played.count()
        total_games = 0
        total_turns = 0
        temp_avg_throw = 0
        temp_avg_leg = 0
        for game_data in games_played:
            total_games += 1
            total_turns += game_data.total_turns
            temp_avg_throw += game_data.avg_game_throw
            temp_avg_leg += game_data.avg_leg
        total_avg = temp_avg_throw / total_games
        total_avg_leg = temp_avg_leg / total_games
        avg_turns_per_game = total_turns / total_games
        self.avg_throw = total_avg
        self.avg_leg = total_avg_leg
        self.avg_turns_per_game = avg_turns_per_game
        self.all_turns = total_turns
        self.save()
