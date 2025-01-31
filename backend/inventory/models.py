from django.db import models
import uuid

class Category(models.Model):
  categoryId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  name = models.CharField(max_length=100, blank=False, null=False)
  state = models.BooleanField(default=True, blank=False, null=False)

  def __str__(self):
    return self.name

class SubCategory(models.Model):
  subCategoryId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  categoryId = models.ForeignKey(Category, on_delete=models.CASCADE)
  name = models.CharField(max_length=100, unique=True, blank=False, null=False)
  state = models.BooleanField(default=True, blank=False, null=False)
  
  def __str__(self):
    return self.name

class UnitMensuare(models.Model):
  unitMensuareId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  name = models.CharField(max_length=100, blank=False, null=False)
  state = models.BooleanField(default=True, blank=False, null=False)

  def __str__(self):
    return self.name

class Product(models.Model):
  productId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
  subCategoryId = models.ForeignKey(SubCategory, on_delete=models.CASCADE, null=True, blank=True)
  name = models.CharField(max_length=150, blank=False, null=False)
  description = models.TextField(blank=True, null=True)
  state = models.BooleanField(default=True, blank=False, null=False)
  dateCreated = models.DateTimeField(auto_now_add=True, blank=False, null=False)

  def __str__(self):
    return self.name
  
class ProductVariant (models.Model):
  productVariantId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  productId = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_variants')  # ForeignKey y no OneToOneField
  name = models.CharField(max_length=100, blank=True, null=True)
  state = models.BooleanField(default=True, blank=True, null=True)
  
  def __str__(self):
    return f"{self.productId.name} - {self.name}"

class ProductOptionVariant (models.Model):
  productOptionVariantId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  productVariantId = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name='product_option_variants')
  name = models.CharField(max_length=100, blank=True, null=True)
  state = models.BooleanField(default=True, blank=True, null=True)

  def __str__(self):
    return f"{self.productVariantId.name} - {self.name}"

class ProductCombination (models.Model):
  productCombinationId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)    
  productId = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_combinations')
  name = models.CharField(max_length=100, blank=True, null=True)

  def __str__(self):
    return f"{self.productId.name} - {self.name}"

class ProductOptionCombination (models.Model):
  productOptionCombinationId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  productCombinationId = models.ForeignKey(ProductCombination, on_delete=models.CASCADE, related_name='product_option_combinations')
  name = models.CharField(max_length=100, blank=True, null=True)

  def __str__(self):
    return f"{self.productCombinationId.name} - {self.name}"

class ProductPrice(models.Model):
    productPriceId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_prices', null=True, blank=True)
    productCombination = models.ForeignKey(ProductCombination, on_delete=models.CASCADE, related_name='combination_prices', null=True, blank=True)
    productOptionCombination = models.ForeignKey(ProductOptionCombination, on_delete=models.CASCADE, related_name='option_combination_prices', null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    comparePrice = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, default=0)
    cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    isTax = models.BooleanField(default=True, blank=True, null=True)

    def __str__(self):
        if self.productOptionCombination:
            return f"{self.productOptionCombination} - ${self.price}"
        elif self.productCombination:
            return f"{self.productCombination} - ${self.price}"
        elif self.product:
            return f"{self.product.name} - ${self.price}"
        return f"Price ID: {self.productPriceId}"
    
class Collection(models.Model):
    MY_CHOICES = [
        (0, 'MANUAL'),
        (1, 'INTELIGENTE'),
    ]
    
    combinationId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    typeCollection = models.CharField(max_length=100, choices=MY_CHOICES, default=0, blank=False, null=False)
    createdAt = models.DateTimeField(auto_now_add=True, blank=False, null=False)

class IntelligentCombination(models.Model):
    CONDITIONS_NAME = [
      ('title','Titulo'),
      ('type','Tipo' ),
      ('category', 'Categoria' ),
      ('vendor', 'Proveedor' ),
      ('tag', 'Etiqueta' ),
      ('price', 'Precio' ),
      ('comparePrice', 'Precio de comparación' ),
      ('weight', 'Peso' ),
      ('stock', 'Existencia de inventario' ),
      ('variantTitle', 'Titulo de la variante' ),
   ]

    CONDITIONS_VALUE = [
      ('equals', 'es igual a'),
      ('not_equals', 'no es igual a'),
      ('starts_with', 'comienza con'),
      ('ends_with', 'termina en'),
      ('contains', 'contiene'),
      ('not_contains', 'no contiene'),
      ('greater_than', 'es mayor que'),
      ('less_than', 'es menor que'),
    ]

    intelligentCombinationId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    combinationId = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name='intelligent_combinations')
    conditionName = models.CharField(max_length=100, choices=CONDITIONS_NAME, default='title', blank=False, null=False)
    conditionValue = models.CharField(max_length=100, choices=CONDITIONS_VALUE, default='equals', blank=False, null=False)
    
    def __str__(self):
        return f"{self.conditionName} - {self.conditionValue}"

class CombinationDetails(models.Model):
    combinationDetailsId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    combinationId = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name='combination_details')
    productId = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='combination_details')


