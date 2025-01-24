import axios from "axios";
import { Expense } from "../types/expense";

const api = axios.create({
    baseURL: "http://localhost:8000/api",

    // Her istekte gönderilecek varsayılan başlıklar
    headers: {
        // Gönderilen verinin JSON formatında olduğunu belirtir
        "Content-Type": "application/json",
    },
});

// GET isteği (Harcamaları listele)
export const getExpenses = async (): Promise<Expense[]> => {
    const response = await api.get<Expense[]>("/expenses/");
    return response.data;
};

// POST isteği (Yeni harcama ekle)
export const addExpense = async (data: ExpenseFormData): Promise<Expense> => {
    const response = await api.post<Expense>("/expenses/", data);
    return response.data;
};

export interface ExpenseFormData {
    title: string;
    description: string;
    amount: number;
    category: number;
    date: string;
}
