from django.shortcuts import render
from django.contrib.auth.models import User 
from rest_framework import generics 
from .serializers import UserSerializer, BookSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Book
# Create your views here.

#this is the logic to handle the HTTP requests, connecting the requests with the propper data

class BookListCreate(generics.ListCreateAPIView):
    serializer_class= BookSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user #give us the user
        return Book.objects.filter(author=user)
    
    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class BookUpdate(generics.UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # Get the authenticated user
        return Book.objects.filter(author=user)  # Return only the books authored by the user


class BookDelete(generics.DestroyAPIView):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user #give us the user
        return Book.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset= User.objects.all()
    serializer_class= UserSerializer
    permissions_classes = [AllowAny]
