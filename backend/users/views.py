from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView


class ListUsers(APIView):
    def get(self, request):
        return Response({"usernames": 5, "haha": 8})
