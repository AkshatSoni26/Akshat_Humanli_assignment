from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# from .models import ChatUser
import json
from django.views.decorators.csrf import csrf_exempt
# from django.core.serializers import serialize
import pyrebase

config = {
   "apiKey": "AIzaSyD1hdU6JrPzkapAiwS2ib1vMMmuf9GC8fw",
  "authDomain": "chat-app-1bdba.firebaseapp.com",
  "projectId": "chat-app-1bdba",
  "storageBucket": "chat-app-1bdba.appspot.com",
  "messagingSenderId": "250769165998",
  "appId": "1:250769165998:web:aeae314e75cedafc2fa73f",
  "measurementId": "G-327H84D9Z4",
  "databaseURL":'https://chat-app-1bdba-default-rtdb.firebaseio.com'
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

USERS = 'users'
CHATS = 'chats'

dbUser = db.child(USERS)
dbChat = db.child(CHATS)




# @csrf_exempt
# def register(request):

#     if request.method == 'POST':

#         # Extract username and password from POST data
#         data = json.loads(request.body.decode('utf-8'))
#         username = data.get('username')
#         password = data.get('password')

#         if len(username) < 2:
#             return JsonResponse({'message':'username should be grater then 2.', 'status':400},status=400)
        
#         if len(password) < 2:
#             return JsonResponse({'message':'password should be grater then 2.', 'status':400},status=400)

#         # Check if username already exists
#         if ChatUser.objects.filter(name=username).exists():
#             return JsonResponse({'message':'Username already exists', 'status':400}, status=200)
        
#         # Create new user
#         user = ChatUser(name=username, password=password)
#         user.save()

#         userId = ChatUser.objects.filter(name=username).first()
        
#         return JsonResponse({'message':'User registered successfully', 'id': userId.id, "status":200}, status=200)

#     else:
#         return HttpResponse('Only POST requests are allowed for registration', status=405)



# # make the two users.
# data = dbUser.child('user2').set( )
# print('data ===>', data)

@csrf_exempt
def login(request):
    
    if request.method == 'POST':
            
      # for getting the user data
      all_data = dbUser.get().val()

      if (all_data != None):
      
          # print("all_data ===>", { k:v for i in all_data.values() for k,v in i.items()})
          all_data = { k:v for i in all_data.values() for k,v in i.items()}
          # print("all_data ===>", all_data.values())

          try:
                # Get the JSON data from the request body
                post_data = json.loads(request.body.decode('utf-8'))

                # Access individual POST parameters
                username = post_data.get('username')

                if (username in all_data):
                
                  password = post_data.get('passward')


                  print("password ===>", password)

                  print("all_data[username]['passward'] ====>", all_data[username]['passward'])

                  if(all_data[username]['passward'] == password):
                  
                    # updating the values

                    login = not (all_data[username]['isLogin'])

                    data_to_update = {f'{USERS}/user1/isLogin': login}
                    updated_data = db.update(data_to_update)

                    print("data_to_update :-", data_to_update)
                    print('updated_data ===>', updated_data)

                    return JsonResponse({"id":all_data[username]['id'], "error":False}, status=200)

                  else:
                    return JsonResponse({"message":'you entered invalid passward.', "error":True}, status=400)

                  # Perform login logic here
                  return HttpResponse("POST request received")
                else:
                    return JsonResponse({"message":'you entered invalid username.', "error":True}, status=400)

          except json.JSONDecodeError as e:
                return HttpResponse("Invalid JSON data", status=400)
          
      else:
            return JsonResponse({"message":'something went wrong in database query.', "error":True}, status=400)
    
    else:
        return HttpResponse("This view accepts only POST requests")
    

# @csrf_exempt
# def get_todos(request):
#     if request.method == 'POST':
#         # Extract user ID from POST data
#         data = json.loads(request.body.decode('utf-8'))
#         user_id = data.get('user_id')

#         # Check if user ID is provided
#         if not user_id:
#             return JsonResponse({'message': 'User ID is required.', 'status': 400}, status=400)

#         # Check if user exists
#         user = ChatUser.objects.filter(id=user_id).first()

#         if user:
#             # Retrieve todos associated with the user
#             todos = Todo.objects.filter(user_id=user_id)
#             todo_list = [{'todo': todo.todo,'todo_id':todo.id , 'description': todo.description, 'status': todo.status} for todo in todos]
#             return JsonResponse({'todos': todo_list}, status=200)
#         else:
#             return JsonResponse({'message': 'User not found.', 'status': 404}, status=404)
#     else:
#         return JsonResponse({'message': 'Only POST requests are allowed to retrieve todos.', 'status': 405}, status=405)



# @csrf_exempt
# def create_chat(request):
#     if request.method == 'POST':
#         # Extract data from POST request
#         data = json.loads(request.body.decode('utf-8'))
#         user_id = data.get('user_id')
#         todo_text = data.get('todo')
#         description = data.get('description')
#         status = data.get('status', 'in-progress')  # Default to 'in-progress' if status is not provided

#         # Check if all required fields are provided
#         if not (user_id and todo_text and description):
#             return JsonResponse({'message': 'user_id, todo, and description are required fields.', 'status': 400}, status=400)

#         # Check if user exists
#         user = ChatUser.objects.filter(id=user_id).first()

#         if user:
#             # Create new todo
#             todo = Todo.objects.create(user_id=user, todo=todo_text, description=description, status=status)
#             return JsonResponse({'message': 'Todo created successfully.', 'todo_id': todo.id}, status=201)
#         else:
#             return JsonResponse({'message': 'User not found.', 'status': 404}, status=404)
#     else:
#         return JsonResponse({'message': 'Only POST requests are allowed to create todos.', 'status': 405}, status=405)


# @csrf_exempt
# def update_chat(request):
#     if request.method == 'PATCH':
#         # Extract data from POST request
#         data = json.loads(request.body.decode('utf-8'))
#         todo_id = data.get('todo_id')
#         new_status = data.get('new_status')

#         # Check if both todo_id and new_status are provided
#         if not (todo_id and new_status):
#             return JsonResponse({'message': 'Both todo_id and new_status are required fields.', 'status': 400}, status=400)

#         # Check if todo exists
#         todo = Todo.objects.filter(id=todo_id).first()
#         if todo:
#             # Update todo status
#             todo.status = new_status
#             todo.save()
#             return JsonResponse({'message': 'Todo status updated successfully.', 'todo_id': todo.id}, status=200)
#         else:
#             return JsonResponse({'message': 'Todo not found.', 'status': 404}, status=404)
#     else:
#         return JsonResponse({'message': 'Only POST requests are allowed to update todo status.', 'status': 405}, status=405)


# @csrf_exempt
# def delete_chat(request, todo_id):
#     if request.method == 'DELETE':
#         # Check if todo exists
#         try:
#             todo = Todo.objects.get(id=todo_id)
#         except Todo.DoesNotExist:
#             return JsonResponse({'message': 'Todo not found.', 'status': 404}, status=404)

#         # Delete the todo
#         todo.delete()
#         return JsonResponse({'message': 'Todo deleted successfully.', 'todo_id': todo_id}, status=200)
#     else:
#         return JsonResponse({'message': 'Only DELETE requests are allowed to delete todos.', 'status': 405}, status=405)
    

# @csrf_exempt
# def update_todo(request, todo_id):
#     if request.method == 'PUT':
#         # Check if todo exists
#         try:
#             todo = Todo.objects.get(id=todo_id)
#         except Todo.DoesNotExist:
#             return JsonResponse({'message': 'Todo not found.', 'status': 404}, status=404)

#         # Extract data from PUT request
#         data = json.loads(request.body.decode('utf-8'))
#         user_id = data.get('user_id')
#         todo_text = data.get('todo')
#         description = data.get('description')
#         status = data.get('status')

#         # Update todo fields if provided
#         if user_id:
#             todo.user_id_id = user_id
#         if todo_text:
#             todo.todo = todo_text
#         if description:
#             todo.description = description
#         if status:
#             todo.status = status

#         todo.save()

#         return JsonResponse({'message': 'Todo updated successfully.', 'todo_id': todo.id}, status=200)
#     else:
#         return JsonResponse({'message': 'Only PUT requests are allowed to update todos.', 'status': 405}, status=405)
