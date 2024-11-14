from django.shortcuts import render
from rest_framework import viewsets
from .serializer import CountrySerializer
from .models import Country

class CountryViewSet(viewsets.ModelViewSet):
  queryset = Country.objects.all()
  serializer_class = CountrySerializer
