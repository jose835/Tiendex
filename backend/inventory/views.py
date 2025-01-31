from rest_framework import viewsets
from .models import Category, SubCategory, Product, UnitMensuare, ProductVariant, ProductCombination, ProductPrice, Collection
from .serializer import CategorySerializer, SubCategorySerializer, UnitMensuareSerializer, ProductSerializer, ProductVariantSerializer, ProductCombinationSerializer, ProductPriceSerializer, CollectionSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status

class CategoryViewSet(viewsets.ModelViewSet):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer

  def create(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)
      try:
          serializer.is_valid(raise_exception=True)
          self.perform_create(serializer)
          return Response(serializer.data, status=status.HTTP_201_CREATED)
      except ValidationError as e:
          error_message = self.format_error_message(e.detail)
          return Response({"message": error_message}, status=status.HTTP_400_BAD_REQUEST)
        
  def format_error_message(self, detail):
      if isinstance(detail, list):
        return str(detail[0])
      elif isinstance(detail, dict):
        for key in detail:
            return str(detail[key][0])
      return str(detail)

class SubCategoryViewSet(viewsets.ModelViewSet):
  queryset = SubCategory.objects.all()
  serializer_class = SubCategorySerializer

class UnitMensuareViewSet(viewsets.ModelViewSet):
  queryset = UnitMensuare.objects.all()
  serializer_class = UnitMensuareSerializer

class ProductViewSet(viewsets.ModelViewSet):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer

class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer

class ProductCombinationViewSet(viewsets.ModelViewSet):
    queryset = ProductCombination.objects.all()
    serializer_class = ProductCombinationSerializer

class ProductPriceViewSet(viewsets.ModelViewSet):
    queryset = ProductPrice.objects.all()
    serializer_class = ProductPriceSerializer

class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer