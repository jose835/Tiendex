# Generated by Django 5.1.2 on 2024-11-26 03:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0017_alter_product_productid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='subCategoryId',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='inventory.subcategory'),
        ),
    ]
