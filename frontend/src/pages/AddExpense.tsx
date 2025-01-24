import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addExpense, ExpenseFormData } from "../api/expenses";

export default function AddExpense() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: ExpenseFormData) => addExpense(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
            navigate("/");
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        mutate({
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            amount: Number(formData.get("amount")),
            category: Number(formData.get("category")),
            date: new Date().toISOString(),
        });
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Add New Expense</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        className="w-full rounded-lg border p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        className="w-full rounded-lg border p-2"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Amount
                    </label>
                    <input
                        type="number"
                        name="amount"
                        step="0.01"
                        className="w-full rounded-lg border p-2"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    disabled={isPending}
                >
                    {isPending ? "Adding..." : "Add Expense"}
                </button>
            </form>
        </div>
    );
}
