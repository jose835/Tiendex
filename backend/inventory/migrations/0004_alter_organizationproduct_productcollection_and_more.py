# Generated by Django 5.1.2 on 2024-10-26 16:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0003_unitmensuare_product_organizationproduct_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organizationproduct',
            name='productCollection',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='organizationproduct',
            name='productId',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='organization_product', to='inventory.product'),
        ),
        migrations.AlterField(
            model_name='organizationproduct',
            name='productTag',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='organizationproduct',
            name='productType',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='organizationproduct',
            name='productVendor',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='productprice',
            name='productId',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='product_price', to='inventory.product'),
        ),
    ]
