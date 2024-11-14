from django.urls import path, include
from .views import CountryViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'country', CountryViewSet, 'country')

urlpatterns = [
  path('api/v1/', include(router.urls)),
]