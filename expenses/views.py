from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from .models import Expense, Category, Budget
from datetime import date, datetime
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import ExpenseSerializer, CategorySerializer

"""
-> Her bir view, bir HTTP isteğine yanıt olarak bir şablon (template) 
render eder ve genellikle veritabanı ile etkileşime girer.
"""

@login_required # 1. decorator / login olmadan bu sayfaya erişilemez
def expense_list(request): # 2. view fonksiyonu
    # 3. veritabanından veri çekme / sorgulama
    # user=request.user: login olan kullanıcının verilerini çek
    expenses = Expense.objects.filter(user=request.user) 
    
    # total: expenses'in amount'larının toplamı
    total = expenses.aggregate(Sum('amount'))['amount__sum'] or 0 
    
    # 4. context hazırlama
    context = {
        'expenses': expenses,
        'total': total,
    }

    # 5. render fonksiyonu ile template'i çağırma
    return render(request, 'expenses/expense_list.html', context)

@login_required 
def add_expense(request):
    # POST isteği ile form verileri gönderildiğinde
    if request.method == 'POST':
        # db'de alınan veriler ile yeni bir record oluşturma
        Expense.objects.create( 
            title=request.POST['title'],
            description=request.POST['description'],
            amount=request.POST['amount'],
            category_id=request.POST['category'],
            user=request.user,
            date=date.today()
        )

        # yeni bir gider kaydedildikten sonra, kullanıcı expense_list sayfasına yönlendirilir.
        return redirect('expense_list')
    
    # GET isteği ile sayfa yüklendiğinde, kullanıcıya kategori seçimi için form gösterilir.
    categories = Category.objects.all()
    return render(request, 'expenses/add_expense.html', {'categories': categories})

class ExpenseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ExpenseSerializer
    
    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
