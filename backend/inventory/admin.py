from django.contrib import admin
from .models import Category, SubCategory, Product, ProductPrice, OrganizationProduct, ProductIdentifier, ProductInventory, ProductVariant, ProductOptionVariant, UnitMensuare

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Product)
admin.site.register(ProductPrice)
admin.site.register(OrganizationProduct)
admin.site.register(ProductIdentifier)
admin.site.register(ProductInventory)
admin.site.register(ProductVariant)
admin.site.register(ProductOptionVariant)
admin.site.register(UnitMensuare)
