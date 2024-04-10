from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('login/', views.login, name='login' ),

    path('create-chat/', views.create_chat, name='create_chat'),
]
