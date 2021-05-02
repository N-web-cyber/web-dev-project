from rest_framework import serializers

from .models import Category, Discussion, Topic, Comment


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True)


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()

    def create(self, validated_data):
        category = Category.objects.create(name=validated_data.get('name'))
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class DiscussionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Discussion
        fields = ('id', 'name', 'description', 'category', 'category_id')


class TopicSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author_id = serializers.IntegerField(write_only=True)
    discussion_id = serializers.IntegerField(write_only=True)
    author = UserSerializer(read_only=True)
    discussion = DiscussionSerializer(read_only=True)

    class Meta:
        model = Topic
        fields = ('id', 'title', 'description', 'author', 'discussion', 'author_id', 'discussion_id')


class CommentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    content = serializers.CharField()
    date = serializers.DateTimeField(read_only=True)
    author_id = serializers.IntegerField(write_only=True)
    topic_id = serializers.IntegerField(write_only=True)
    author = UserSerializer(read_only=True)
    topic = TopicSerializer(read_only=True)

    def create(self, validated_data):
        comment = Comment.objects.create(content=validated_data.get('content'),
                                         author_id=validated_data.get('author_id'),
                                         topic_id=validated_data.get('topic_id'))
        return comment

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance
