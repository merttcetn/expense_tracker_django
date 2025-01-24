import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../api/expenses";
import { Expense } from "../types/expense";

export default function Dashboard() {
    const { data: expenses, isLoading } = useQuery<Expense[]>({
        queryKey: ["expenses"],
        queryFn: getExpenses,
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Expenses</h1>

            <div className="grid gap-4">
                {expenses && expenses.length > 0 ? (
                    expenses.map((expense: Expense) => (
                        <div
                            key={expense.id}
                            className="bg-white rounded-lg shadow p-4"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold">
                                    {expense.title}
                                </h3>
                                <span className="text-green-600 font-bold">
                                    ${expense.amount}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                {expense.description}
                            </p>
                            <div className="flex justify-between mt-2 text-sm text-gray-500">
                                <span>{expense.category_name}</span>
                                <span>
                                    {new Date(
                                        expense.date
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No expenses found.</p>
                )}
            </div>
        </div>
    );
}
