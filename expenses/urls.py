# urls.py otomatik olarak oluşturulmaz. bu manuel eklenir.
from django.urls import path
from . import views

urlpatterns = [
    path('', views.expense_list, name='expense_list'),
    path('add/', views.add_expense, name='add_expense'),
]

"""
-> ilk parametre: URL'nin hangi desene (path) sahip olduğunu belirtir.
-> ikinci parametre: URL'ye geldiğinde çalıştırılacak view fonksiyonudur.
-> üçüncü parametre: URL'yi tanımlamak için bir isim verir. 
   diğer sayfalardan bu ismi kullanarak bu sayfaya erişebiliriz.
"""