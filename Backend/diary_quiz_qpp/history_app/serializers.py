from rest_framework import serializers
from .models import History
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =('id', 'username', 'password')
        extra_kwargs ={'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class HistorySerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = History
        fields = ('id',
                  'title',
                  'summary',
                  'ContentSubtitle1',
                  'Content1',
                  'ContentSubtitle2',
                  'Content2',
                  'ContentSubtitle3',
                  'Content3',
                  'ContentSubtitle4',
                  'Content4',
                  'ContentSubtitle5',
                  'Content5',
                  'images',
                  'category',
                  'author',
                  'created_at',
                  'updated_at',
                  )
