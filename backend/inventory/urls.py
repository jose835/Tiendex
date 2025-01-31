from django.urls import path, include
from rest_framework import routers
from .views import CategoryViewSet, SubCategoryViewSet, UnitMensuareViewSet, ProductViewSet, ProductVariantViewSet, ProductCombinationViewSet, ProductPriceViewSet, CollectionViewSet

router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet, 'category')
router.register(r'subcategory', SubCategoryViewSet, 'subcategory')
router.register(r'unit-mensuare', UnitMensuareViewSet, 'unit-mensuare')
router.register(r'products', ProductViewSet, 'product')
router.register(r'product-variant', ProductVariantViewSet, 'product-variant')
router.register(r'product-combination', ProductCombinationViewSet, 'product-combination')
router.register(r'product-price', ProductPriceViewSet, 'product-price')
router.register(r'collection', CollectionViewSet, 'collection')

urlpatterns = [
  path('api/v1/', include(router.urls)),
]