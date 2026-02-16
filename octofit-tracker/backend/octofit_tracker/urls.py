"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path, include
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse

# Override api_root to use CODESPACE_NAME environment variable
@api_view(['GET'])
def api_root(request):
    """
    API root endpoint that uses CODESPACE_NAME for URL building when in codespace.
    """
    codespace_name = os.getenv('CODESPACE_NAME')
    
    # Build base URL based on CODESPACE_NAME
    if codespace_name and codespace_name != 'localhost':
        # Use HTTPS for GitHub Codespace (detected by X-Forwarded-Proto header)
        protocol = request.scheme  # Will be https if SECURE_PROXY_SSL_HEADER is configured
        base_url = f"{protocol}://{codespace_name}-8000.app.github.dev/api"
    else:
        # Use reverse with request for local development
        base_url = request.build_absolute_uri('/api')
    
    return Response({
        'users': f"{base_url}/users/",
        'teams': f"{base_url}/teams/",
        'activities': f"{base_url}/activities/",
        'workouts': f"{base_url}/workouts/",
        'leaderboard': f"{base_url}/leaderboard/",
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include('octofit_tracker.api_urls')),
]
