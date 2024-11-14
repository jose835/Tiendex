from django.urls import path, include
from rest_framework import routers
from .views import CategoryViewSet, SubCategoryViewSet, ProductViewSet, UnitMensuareViewSet, ProductPriceViewSet

router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet, 'category')
router.register(r'subcategory', SubCategoryViewSet, 'subcategory')
router.register(r'product', ProductViewSet, 'product')
router.register(r'unit-mensuare', UnitMensuareViewSet, 'unit-mensuare')
router.register(r'product-price', ProductPriceViewSet, 'product-price')

urlpatterns = [
  path('api/v1/', include(router.urls)),
]