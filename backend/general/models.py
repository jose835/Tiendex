from django.db import models
import uuid

class Country(models.Model):
  countryId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  name = models.CharField(max_length=100, blank=False, null=False)
  state = models.BooleanField(default=True, blank=False, null=False)

  def __str__(self):
    return self.name
