# Generated by Django 5.1.2 on 2024-10-28 23:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0012_remove_product_categoryid_product_subcategoryid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='subCategoryId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventory.subcategory'),
        ),
    ]