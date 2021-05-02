from rest_framework import status, generics, mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import Category, Discussion, Topic, Comment
from ..serializers import CategorySerializer, DiscussionSerializer, TopicSerializer, CommentSerializer


class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryDetails(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class DiscussionList(generics.ListAPIView):
    queryset = Discussion.objects.all()
    serializer_class = DiscussionSerializer


class DiscussionDetails(generics.RetrieveAPIView):
    queryset = Discussion.objects.all()
    serializer_class = DiscussionSerializer


class CategoryDiscussions(APIView):
    def get(self, request, category_id):
        discussions = Discussion.objects.filter(category_id=category_id)
        serializer = DiscussionSerializer(discussions, many=True)
        return Response(serializer.data)


class TopicList(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class TopicDetails(mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   generics.RetrieveAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def put(self, request, *args, **kwargs):
        if request.user != self.get_object().author:
            return Response(status=status.HTTP_403_FORBIDDEN)
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        if request.user != self.get_object().author:
            return Response(status=status.HTTP_403_FORBIDDEN)
        return self.destroy(request, *args, **kwargs)


class DiscussionTopics(APIView):
    def get(self, request, discussion_id):
        topics = Topic.objects.filter(discussion_id=discussion_id)
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class CommentDetails(mixins.DestroyModelMixin,
                     generics.RetrieveAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def delete(self, request, *args, **kwargs):
        if request.user != self.get_object().author:
            return Response(status=status.HTTP_403_FORBIDDEN)
        return self.destroy(request, *args, **kwargs)


class TopicComments(APIView):
    def get(self, request, topic_id):
        comments = Comment.objects.filter(topic_id=topic_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
