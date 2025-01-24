from rest_framework import serializers
from .models import Expense, Category

"""
Serializer'lar Django modellerini JSON formatına dönüştürür ve tam tersi işlemi yapar:
- Model → JSON: Veritabanından gelen verileri frontend'in anlayabileceği formata çevirir
- JSON → Model: Frontend'den gelen JSON verisini Django modellerine çevirir
"""

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ExpenseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Expense
        fields = [
            'id', 
            'title', 
            'description', 
            'amount', 
            'date', 
            'category'
        ] 