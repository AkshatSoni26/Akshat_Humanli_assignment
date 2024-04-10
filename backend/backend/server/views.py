from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# from .models import ChatUser
import json
from django.views.decorators.csrf import csrf_exempt
# from django.core.serializers import serialize
import pyrebase
import uuid
import time



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
                else:
                    return JsonResponse({"message":'you entered invalid username.', "error":True}, status=400)

          except json.JSONDecodeError as e:
                return HttpResponse("Invalid JSON data", status=400)
          
      else:
            return JsonResponse({"message":'something went wrong in database query.', "error":True}, status=400)
    
    else:
        return HttpResponse("This view accepts only POST requests")
    

@csrf_exempt
def update_message(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get('id')
        new_message = data.get('message')
        if user_id and new_message:
            try:
                # Update message in Firebase
                dbChat.child(user_id).update({'message': new_message, })
                return JsonResponse({'message': 'Message updated successfully'})
            except :
                return JsonResponse({'error': 'something went wrong.'}, status=404)
        else:
            return JsonResponse({'error': 'Missing id or message field'}, status=400)

@csrf_exempt
def create_chat(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        new_message = data.get('message')
        user_id = data.get('id')
        if new_message:
            # Save message to Firebase
            db.child('chats').push({
                'message': new_message,
                'time': str(time.time()),
                'id':user_id
            })
            return JsonResponse({'message': 'Message created successfully'}, status=200)
        else:
            return JsonResponse({'error': 'Missing message field'}, status=400)