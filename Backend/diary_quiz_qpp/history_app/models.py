from django.db import models
from django.contrib.auth.models import User

Category = [
    ('データサイエンス', 'DataScience'),
    ('機械学習', 'Machine Learning'),
    ('ディープラーニング', 'Deep Learning'),
    ('データ分析', 'Data Analysis'),
    ('Python 基礎', 'Python Basic'),
    ('Django', 'Django'),
    ('環境構築', 'environ_set'),
    ('その他', 'etc')
]


class History(models.Model):
    title = models.CharField(max_length=100)
    summary = models.TextField(max_length=500)

    ContentSubtitle1 = models.CharField(max_length=100)
    Content1 = models.TextField(max_length=500, blank=True, null=True)
    ContentSubtitle2 = models.CharField(max_length=100, blank=True, null=True)
    Content2 = models.TextField(max_length=500, blank=True, null=True)
    ContentSubtitle3 = models.CharField(max_length=100, blank=True, null=True)
    Content3 = models.TextField(max_length=500, blank=True, null=True)
    ContentSubtitle4 = models.CharField(max_length=100, blank=True, null=True)
    Content4 = models.TextField(max_length=500, blank=True, null=True)
    ContentSubtitle5 = models.CharField(max_length=100, blank=True, null=True)
    Content5 = models.TextField(max_length=500, blank=True, null=True)

    images = models.ImageField(upload_to='images/', blank=True, null=True)
    category = models.CharField(max_length=30, choices=Category)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
