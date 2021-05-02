from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from .views.cbv import CategoryList, CategoryDetails, DiscussionList, DiscussionDetails, CategoryDiscussions, \
    TopicList, TopicDetails, DiscussionTopics, CommentList, CommentDetails, TopicComments
from .views.fbv import category_list, user_detail


urlpatterns = [
    path('login/', obtain_jwt_token),
    path('profile/', user_detail),
    path('categories/', category_list),
    path('categories/<int:pk>/', CategoryDetails.as_view()),
    path('discussions/', DiscussionList.as_view()),
    path('discussions/<int:pk>/', DiscussionDetails.as_view()),
    path('categories/<int:category_id>/discussions/', CategoryDiscussions.as_view()),
    path('topics/', TopicList.as_view()),
    path('topics/<int:pk>/', TopicDetails.as_view()),
    path('discussions/<int:discussion_id>/topics/', DiscussionTopics.as_view()),
    path('comments/', CommentList.as_view()),
    path('comments/<int:pk>/', CommentDetails.as_view()),
    path('topics/<int:topic_id>/comments/', TopicComments.as_view())
]
