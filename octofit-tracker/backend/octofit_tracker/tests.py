from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from .models import Team, Activity, Workout, Leaderboard

class TeamTestCase(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name="Marvel", description="Marvel superheroes")

    def test_team_creation(self):
        self.assertEqual(self.team.name, "Marvel")
        self.assertEqual(str(self.team), "Marvel")

class ActivityTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='password')
        self.team = Team.objects.create(name="Marvel", description="Marvel superheroes")
        self.activity = Activity.objects.create(
            user=self.user,
            team=self.team,
            type='Running',
            duration=30,
            date='2026-02-16'
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.type, 'Running')
        self.assertEqual(self.activity.duration, 30)

class WorkoutTestCase(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(name="Full Body Blast", description="A full body workout")

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, "Full Body Blast")
        self.assertEqual(str(self.workout), "Full Body Blast")

class LeaderboardTestCase(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name="Marvel", description="Marvel superheroes")
        self.leaderboard = Leaderboard.objects.create(team=self.team, points=100)

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.points, 100)
        self.assertEqual(self.leaderboard.team.name, "Marvel")

class APITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='password')
        self.team = Team.objects.create(name="Marvel", description="Marvel superheroes")

    def test_api_root(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, 200)

    def test_users_list(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, 200)

    def test_teams_list(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, 200)
