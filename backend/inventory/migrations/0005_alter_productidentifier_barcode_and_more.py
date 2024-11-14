# Generated by Django 5.1.2 on 2024-10-26 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0004_alter_organizationproduct_productcollection_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productidentifier',
            name='barCode',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='productidentifier',
            name='sku',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='productinventory',
            name='minStock',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='productinventory',
            name='weight',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='productoptionvariant',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='productoptionvariant',
            name='state',
            field=models.BooleanField(blank=True, default=True, null=True),
        ),
    ]