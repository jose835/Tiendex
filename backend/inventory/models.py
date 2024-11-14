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
  productId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  subCategoryId = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
  name = models.CharField(max_length=150, blank=False, null=False)
  description = models.TextField(blank=True, null=True)
  state = models.BooleanField(default=True, blank=False, null=False)
  dateCreated = models.DateTimeField(auto_now_add=True, blank=False, null=False)

  def __str__(self):
    return self.name

class ProductPrice(models.Model):
  productPriceId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  productId = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='product_price')
  price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  comparePrice = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, default=0)
  cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  revenue = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  margin = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  isTax = models.BooleanField(default=True, blank=True, null=True)

  def __str__(self):
    return self.productId.name

class OrganizationProduct(models.Model):
  organizationProductId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  productId = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='organization_product')
  productType = models.CharField(max_length=100, blank=True, null=True)
  productVendor = models.CharField(max_length=100, blank=True, null=True)
  productCollection = models.CharField(max_length=100, blank=True, null=True)
  productTag = models.CharField(max_length=100, blank=True, null=True)
  productOrigin = models.ForeignKey('general.Country', on_delete=models.CASCADE, blank=True, null=True)

  def __str__(self):
    return self.productId.name

class ProductInventory(models.Model):
  productInventoryId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  productId = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='product_inventory')
  unitMeansureId = models.ForeignKey(UnitMensuare, on_delete=models.CASCADE, blank=True, null=True)
  weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  minStock = models.IntegerField(blank=True, null=True, default=0)
  sellOutStock = models.BooleanField(default=False, blank=True, null=True)

class ProductVariant(models.Model):
  productVariantId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  productId = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_variants')  # ForeignKey y no OneToOneField
  name = models.CharField(max_length=100, blank=True, null=True)
  state = models.BooleanField(default=True, blank=True, null=True)
  
  def __str__(self):
    return f"{self.productId.name} - {self.name}"
  
  
class ProductOptionVariant(models.Model):
  productOptionVariantId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  productVariantId = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name='product_option_variants')
  name = models.CharField(max_length=100, blank=True, null=True)
  state = models.BooleanField(default=True, blank=True, null=True)

  def __str__(self):
    return f"{self.productVariantId.name} - {self.name}"

class ProductIdentifier(models.Model):
  productIdentifierId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  productId = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='product_identifier')
  sku = models.CharField(max_length=100, blank=True, null=True)
  barCode = models.CharField(max_length=100, blank=True, null=True)


