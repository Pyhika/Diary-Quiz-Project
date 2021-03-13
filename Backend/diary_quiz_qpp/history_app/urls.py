from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import HistoryViewSet, UserViewSet, ManageUserView

router = routers.DefaultRouter()
router.register('history', HistoryViewSet)
router.register('user', UserViewSet)

# generic
urlpatterns = [
    path('myself/', ManageUserView.as_view(), name='myself'),
    path('', include(router.urls))
    ]
