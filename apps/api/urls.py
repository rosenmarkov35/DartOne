from django.urls import path

from apps.accounts.views import SignUpView, SignInView, SignOutView, CheckAuthView, SaveGameView, MyAccountView, \
    PlayerAccountView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('signin/', SignInView.as_view(), name='signin'),
    path('signout/', SignOutView.as_view(), name='signout'),
    path('check-auth/', CheckAuthView.as_view(), name='check-auth'),

    path('save-game/', SaveGameView.as_view(), name='save-game'),
    path('myaccount/', MyAccountView.as_view(), name='myaccount'),
    path('account/<str:username>/', PlayerAccountView.as_view(), name='playeraccount'),

]
