from django.urls import path
from .views import Login , compiHistoryView

urlpatterns = [
    path('', Login, name='home'),
    path('history/', compiHistoryView, name='home')
]