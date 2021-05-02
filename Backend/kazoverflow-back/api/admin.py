from django.contrib import admin
from .models import Topic, Discussion, Comment, Category
# Register your models here.
admin.site.register((Topic, Discussion, Comment, Category))
