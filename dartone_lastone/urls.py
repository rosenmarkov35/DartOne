from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from apps.common.views import IndexView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.api.urls')),
    re_path(r'^.*$', IndexView.as_view(), name='index'),
]
