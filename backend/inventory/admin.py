from django.contrib import admin
from .models import Category, SubCategory, Product, UnitMensuare, ProductPrice, ProductOptionVariant, ProductVariant, ProductCombination, ProductOptionCombination

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Product)
admin.site.register(UnitMensuare)
admin.site.register(ProductPrice)
admin.site.register(ProductOptionVariant)
admin.site.register(ProductVariant)
admin.site.register(ProductCombination)
admin.site.register(ProductOptionCombination)
