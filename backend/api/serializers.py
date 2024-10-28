from django.contrib.auth.models import User
from rest_framework import serializers #to convert in formats that can be rendered in JSON or other formats
from .models import Book

#serializers convert complex data in python data that can be converted in JSON files

class UserSerializer(serializers.ModelSerializer): #responsible to transform data of the model in a format that can be send by the API

    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password": {"write_only":True}} #so that the password can only be send, it will not be returned on the response
    def create(self,validated_data): #to create a new instance of User with valid data (that it was checked before in class Meta)
        user = User.objects.create_user(**validated_data)#create_user creates an User and the password is stored in a safe way (hash)
        return user #returns the user that we created

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id","title","content","created_at","author"]
        extra_kwargs = {"author":{"read_only": True}}