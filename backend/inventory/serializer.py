from rest_framework import serializers
from .models import (
    Category, SubCategory, Product, UnitMensuare, ProductVariant, ProductOptionVariant, ProductCombination, ProductOptionCombination, ProductPrice, Collection, IntelligentCombination
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

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['productId', 'name', 'description', 'subCategoryId']
        extra_kwargs = {
            'productId': {'required': True}  # productId ahora es requerido
        }

    def create(self, validated_data):
        return Product.objects.create(**validated_data)

class ProductOptionVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOptionVariant
        fields = ['productOptionVariantId', 'name', 'state']
        extra_kwargs = {
            'productOptionVariantId': {'required': False},  # Opcional para permitir la creación automática del UUID
        }

class ProductVariantSerializer(serializers.ModelSerializer):
    options = serializers.ListField(
        child=serializers.CharField(max_length=100),
        write_only=True
    )

    class Meta:
        model = ProductVariant
        fields = ['productId', 'name', 'options']

    def create(self, validated_data):
        options_data = validated_data.pop('options')
        product_variant = ProductVariant.objects.create(**validated_data)

        for option_name in options_data:
            ProductOptionVariant.objects.create(
                productVariantId=product_variant,
                name=option_name,
                state=True
            )

        return product_variant

# Código corregido en el serializer
class ProductCombinationSerializer(serializers.ModelSerializer):
    options = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField()  # Valida cada campo dentro del objeto
        ),
        write_only=True
    )

    class Meta:
        model = ProductCombination
        fields = ['productCombinationId', 'productId', 'name', 'options']

        extra_kwargs = {
            'productCombinationId': {'required': False, 'read_only': True},
        }

    def create(self, validated_data):
        options_data = validated_data.pop('options', [])

        # Crear ProductCombination
        product_combination = ProductCombination.objects.create(**validated_data)

        for option_data in options_data:
            option_name = option_data.get('name')
            price = option_data.get('price')

            if not option_name or price is None:
                raise serializers.ValidationError("Each option must include 'name' and 'price'.")

            # Crear ProductOptionCombination con el nombre correcto del campo
            option_combination = ProductOptionCombination.objects.create(
                productCombinationId=product_combination,  # Usa el nombre correcto
                name=option_name
            )
            
            # Crear registro en ProductPrice
            ProductPrice.objects.create(
                productCombination=product_combination,
                productOptionCombination=option_combination,
                price=price
            )

        return product_combination


class ProductPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPrice
        fields = ['productPriceId', 'product', 'productCombination', 'productOptionCombination', 
                  'price', 'comparePrice', 'cost', 'isTax']

        extra_kwargs = {
            'productPriceId': {'read_only': True},
            'product': {'required': False}, 
            'productCombination': {'required': False},
            'productOptionCombination': {'required': False},
        }

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['combinationId', 'name', 'description', 'typeCollection', 'createdAt']

# Serializer para el modelo IntelligentCombination
class IntelligentCombinationSerializer(serializers.ModelSerializer):
    combinationId = serializers.PrimaryKeyRelatedField(queryset=Collection.objects.all())

    class Meta:
        model = IntelligentCombination
        fields = ['intelligentCombinationId', 'combinationId', 'conditionName', 'conditionValue']

# Serializer compuesto para manejar ambos modelos a la vez
class CombinedSerializer(serializers.Serializer):
    collection = CollectionSerializer()
    intelligent_combination = IntelligentCombinationSerializer()

    def create(self, validated_data):
        # Crear una colección primero
        collection_data = validated_data.pop('collection')
        collection = Collection.objects.create(**collection_data)
        
        # Crear la combinación inteligente vinculada a la colección recién creada
        intelligent_combination_data = validated_data.pop('intelligent_combination')
        intelligent_combination = IntelligentCombination.objects.create(
            combinationId=collection,
            **intelligent_combination_data
        )
        
        return {
            'collection': collection,
            'intelligent_combination': intelligent_combination
        }

    def update(self, instance, validated_data):
        # Actualizar Collection
        collection_data = validated_data.pop('collection')
        instance.name = collection_data.get('name', instance.name)
        instance.description = collection_data.get('description', instance.description)
        instance.typeCollection = collection_data.get('typeCollection', instance.typeCollection)
        instance.save()

        # Actualizar IntelligentCombination
        intelligent_combination_data = validated_data.pop('intelligent_combination')
        instance.intelligent_combinations.conditionName = intelligent_combination_data.get('conditionName', instance.intelligent_combinations.conditionName)
        instance.intelligent_combinations.conditionValue = intelligent_combination_data.get('conditionValue', instance.intelligent_combinations.conditionValue)
        instance.intelligent_combinations.save()

        return instance

