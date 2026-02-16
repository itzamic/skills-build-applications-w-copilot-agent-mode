from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.contrib.auth.models import User
from .models import Team, Activity, Workout, Leaderboard
from .serializers import (
    UserSerializer,
    TeamSerializer,
    ActivitySerializer,
    WorkoutSerializer,
    LeaderboardSerializer
)

@api_view(['GET'])
def api_root(request):
    return Response({
        'users': reverse('user-list', request=request),
        'teams': reverse('team-list', request=request),
        'activities': reverse('activity-list', request=request),
        'workouts': reverse('workout-list', request=request),
        'leaderboard': reverse('leaderboard-list', request=request),
    })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer
