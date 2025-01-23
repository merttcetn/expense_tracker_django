from django.db import models

# django'nun kendi user modelini kullanıyoruz
from django.contrib.auth.models import User 


# Kategori modeli
class Category(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
    # Category modelinin adının çoğul formunu belirler (Categorys olmasın diye)
    class Meta:
        verbose_name_plural = "Categories"


# Giderleri temsil eden model
class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10)
    date = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    
    # Kaydın oluşturulma zamanını otomatik olarak kaydeden attribute
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.amount} Dollars"
    

# Bütçe modeli
class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    month = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"Budget for {self.month.strftime('%B %Y')}"
    