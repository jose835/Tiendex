# Generated by Django 5.1.2 on 2024-10-28 23:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0011_alter_product_categoryid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='categoryId',
        ),
        migrations.AddField(
            model_name='product',
            name='subCategoryId',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='inventory.subcategory'),
        ),
    ]
