from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    # path('', views.home, name='home' ),
    path('login/', views.login, name='login' ),
    # path('register/', views.register, name='register' ),

    # path('get-todos/', views.get_todos, name='get_todos'),

    # path('create-chat/', views.create_chat, name='create_chat'),
    # path('update-chat/', views.update_chat, name='update_chat'),

    # path('delete-chat/<int:todo_id>/', views.delete_chat, name='delete_chat'),
    # path('update-todo/<int:todo_id>/', views.update_todo, name='update_todo'),

]
