from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from octofit_tracker.models import Team, Activity, Workout, Leaderboard
from django.db import transaction

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        with transaction.atomic():
            self.stdout.write(self.style.WARNING('Deleting old data...'))
            Activity.objects.all().delete()
            Workout.objects.all().delete()
            Leaderboard.objects.all().delete()
            Team.objects.all().delete()
            # Delete all non-superuser users
            for user in User.objects.all():
                if not user.is_superuser:
                    user.delete()

            self.stdout.write(self.style.SUCCESS('Creating teams...'))
            marvel = Team.objects.create(name='Marvel', description='Marvel superheroes')
            dc = Team.objects.create(name='DC', description='DC superheroes')

            self.stdout.write(self.style.SUCCESS('Creating users...'))
            users = [
                {'username': 'ironman', 'email': 'ironman@marvel.com', 'team': marvel},
                {'username': 'captainamerica', 'email': 'cap@marvel.com', 'team': marvel},
                {'username': 'spiderman', 'email': 'spiderman@marvel.com', 'team': marvel},
                {'username': 'batman', 'email': 'batman@dc.com', 'team': dc},
                {'username': 'superman', 'email': 'superman@dc.com', 'team': dc},
                {'username': 'wonderwoman', 'email': 'wonderwoman@dc.com', 'team': dc},
            ]
            user_objs = []
            for u in users:
                user = User.objects.create_user(username=u['username'], email=u['email'], password='password')
                user.profile_team = u['team']
                user.save()
                user_objs.append((user, u['team']))

            self.stdout.write(self.style.SUCCESS('Creating activities...'))
            for user, team in user_objs:
                Activity.objects.create(user=user, team=team, type='Running', duration=30, date='2026-02-16')
                Activity.objects.create(user=user, team=team, type='Cycling', duration=45, date='2026-02-15')

            self.stdout.write(self.style.SUCCESS('Creating workouts...'))
            w1 = Workout.objects.create(name='Full Body Blast', description='A full body workout')
            w2 = Workout.objects.create(name='Cardio Burn', description='High intensity cardio')
            w1.suggested_for.set([marvel, dc])
            w2.suggested_for.set([dc])

            self.stdout.write(self.style.SUCCESS('Creating leaderboards...'))
            Leaderboard.objects.create(team=marvel, points=100)
            Leaderboard.objects.create(team=dc, points=120)

            self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
