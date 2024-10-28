from django.urls import path
from . import views

urlpatterns = [
    path("books/", views.BookListCreate.as_view(), name="book-list"),
    path('books/<int:pk>/', views.BookUpdate.as_view(), name='book-update'),
    path("books/delete/<int:pk>/", views.BookDelete.as_view(), name="delete-book"),
] 