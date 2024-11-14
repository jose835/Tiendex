from rest_framework import serializers
from .models import (
    Category, SubCategory, Product, ProductPrice,
    OrganizationProduct, ProductInventory, ProductIdentifier,
    ProductOptionVariant, ProductVariant, UnitMensuare
)
from rest_framework.exceptions import ValidationError

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    def validate_name(self, value):
        instance = getattr(self, 'instance', None)
        if instance and instance.name == value:
            return value

        if Category.objects.filter(name=value).exists():
            raise ValidationError("Este nombre ya existe.")
        return value

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'
    
    extra_kwargs = {
        'subCategoryId': {'read_only': True}
    }

class UnitMensuareSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitMensuare
        fields = '__all__'

class ProductPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPrice
        fields = [
            'productPriceId', 'price', 'comparePrice', 'cost',
            'revenue', 'margin', 'isTax'
        ]
        extra_kwargs = {
            'productPriceId': {'read_only': True}, 
            'productId': {'read_only': True}
        }

class ProductInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInventory
        fields = [
            'productInventoryId', 'productId', 'unitMeansureId',
            'weight', 'minStock', 'sellOutStock'
        ]
        extra_kwargs = {
            'productInventoryId': {'read_only': True},
            'productId': {'read_only': True}
        }

class OrganizationProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationProduct
        fields = [
            'organizationProductId', 'productId', 'productType',
            'productVendor', 'productCollection', 'productTag',
            'productOrigin'
        ]
        extra_kwargs = {
            'organizationProductId': {'read_only': True},
            'productId': {'read_only': True},
        }

class ProductIdentifierSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductIdentifier
        fields = [
            'productIdentifierId', 'productId', 'sku',
            'barCode'
        ]
        extra_kwargs = {
            'productIdentifierId': {'read_only': True},
            'productId': {'read_only': True}
        }
class ProductOptionVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOptionVariant
        fields = ['name', 'state']

        extra_kwargs = {
            'productOptionVariantId': {'read_only': True},
            'productVariantId': {'read_only': True}
        }

class ProductVariantSerializer(serializers.ModelSerializer):
    product_option_variants = ProductOptionVariantSerializer(many=True)

    class Meta:
        model = ProductVariant
        fields = ['name', 'state', 'product_option_variants']

        extra_kwargs = {
            'productVariantId': {'read_only': True},
            'productId': {'read_only': True}
        }

    def create(self, validated_data):
        options_data = validated_data.pop('product_option_variants')
        variant = ProductVariant.objects.create(**validated_data)
        for option_data in options_data:
            ProductOptionVariant.objects.create(productVariantId=variant, **option_data)
        return variant

class ProductSerializer(serializers.ModelSerializer):
    product_price = ProductPriceSerializer(required=False)
    organization_product = OrganizationProductSerializer(required=False)
    product_inventory = ProductInventorySerializer(required=False)
    product_identifier = ProductIdentifierSerializer(required=False)
    product_variants = ProductVariantSerializer(many=True, required=False)
    subCategoryName = serializers.CharField(source='subCategoryId.name')

    class Meta:
        model = Product
        fields = [
            'productId', 'subCategoryId', 'subCategoryName', 'name', 'description',
            'state', 'dateCreated', 'product_price',
            'organization_product', 'product_inventory',
            'product_identifier', 'product_variants'
        ]
        extra_kwargs = {
            'productId': {'read_only': True},
            'dateCreated': {'read_only': True},
        }

    def create(self, validated_data):
        price_data = validated_data.pop('product_price', None)
        organization_data = validated_data.pop('organization_product', None)
        inventory_data = validated_data.pop('product_inventory', None)
        identifier_data = validated_data.pop('product_identifier', None)
        variants_data = validated_data.pop('product_variants', [])

        product = Product.objects.create(**validated_data)

        if price_data:
            ProductPrice.objects.create(productId=product, **price_data)
        
        if organization_data:
            OrganizationProduct.objects.create(productId=product, **organization_data)
        
        if inventory_data:
            ProductInventory.objects.create(productId=product, **inventory_data)
        
        if identifier_data:
            ProductIdentifier.objects.create(productId=product, **identifier_data)

        for variant_data in variants_data:
            options_data = variant_data.pop('product_option_variants', [])
            variant = ProductVariant.objects.create(productId=product, **variant_data)
            for option_data in options_data:
                ProductOptionVariant.objects.create(productVariantId=variant, **option_data)

        return product

    def update(self, instance, validated_data):
        price_data = validated_data.pop('product_price', None)
        organization_data = validated_data.pop('organization_product', None)
        inventory_data = validated_data.pop('product_inventory', None)
        identifier_data = validated_data.pop('product_identifier', None)
        variants_data = validated_data.pop('product_variants', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Actualizar datos relacionados si están presentes
        if price_data:
            product_price, _ = ProductPrice.objects.update_or_create(
                productId=instance, defaults=price_data
            )

        if organization_data:
            organization_product, _ = OrganizationProduct.objects.update_or_create(
                productId=instance, defaults=organization_data
            )

        if inventory_data:
            product_inventory, _ = ProductInventory.objects.update_or_create(
                productId=instance, defaults=inventory_data
            )

        if identifier_data:
            product_identifier, _ = ProductIdentifier.objects.update_or_create(
                productId=instance, defaults=identifier_data
            )

        for variant_data in variants_data:
            options_data = variant_data.pop('product_option_variants', [])
            variant, _ = ProductVariant.objects.update_or_create(
                productId=instance, name=variant_data['name'], defaults=variant_data
            )
            for option_data in options_data:
                ProductOptionVariant.objects.update_or_create(
                    productVariantId=variant, name=option_data['name'], defaults=option_data
                )

        return instance
