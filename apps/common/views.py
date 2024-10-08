from django.shortcuts import render
import django.views.generic as views


class IndexView(views.TemplateView):
    template_name = 'index.html'
