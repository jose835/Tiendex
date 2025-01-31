# Generated by Django 5.1.2 on 2024-11-23 06:20

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0016_remove_productidentifier_productid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='productId',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
    ]
