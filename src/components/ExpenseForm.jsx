import { useState, useEffect } from "react";

/**
 * ExpenseForm Component
 * Form for adding or editing transactions
 */
function ExpenseForm({
    addTransaction,
    editingId,
    editingTransaction,
    onCancelEdit,
    tracker,
}) {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [category, setCategory] = useState("Food");

    // Categories available
    const expenseCategories = [
        "Food",
        "Transport",
        "Entertainment",
        "Utilities",
        "Shopping",
        "Health",
        "Education",
        "Other",
    ];

    const incomeCategories = [
        "Salary",
        "Freelance",
        "Investment",
        "Bonus",
        "Other",
    ];

    // Load data when editing
    useEffect(() => {
        if (editingTransaction) {
            setTitle(editingTransaction.title);
            setAmount(Math.abs(editingTransaction.amount));
            setCategory(editingTransaction.category || "Other");
            setType(editingTransaction.amount > 0 ? "income" : "expense");
        } else {
            clearForm();
        }
    }, [editingTransaction]);

    const clearForm = () => {
        setTitle("");
        setAmount("");
        setType("expense");
        setCategory("Food");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !amount) {
            alert("Please fill all fields");
            return;
        }

        let finalAmount = Number(amount);

        // If expense selected make amount negative
        if (type === "expense") {
            finalAmount = -Math.abs(finalAmount);
        }
        // If income selected make amount positive
        else {
            finalAmount = Math.abs(finalAmount);
        }

        addTransaction(title, finalAmount, category);
        clearForm();
    };

    const handleCancel = () => {
        clearForm();
        if (onCancelEdit) {
            onCancelEdit();
        }
    };

    const currentCategories =
        type === "income" ? incomeCategories : expenseCategories;

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <h2>
                {editingId ? "✏️ Edit Transaction" : "➕ Add Transaction"}
            </h2>

            {/* Title Input */}
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Enter title (e.g., Lunch, Salary)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                />
            </div>

            {/* Amount Input */}
            <div className="form-group">
                <label htmlFor="amount">Amount (₹)</label>
                <input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step="0.01"
                    min="0"
                    className="form-input"
                />
            </div>

            {/* Type Selection */}
            <div className="form-group">
                <label>Type</label>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            value="income"
                            checked={type === "income"}
                            onChange={(e) => {
                                setType(e.target.value);
                                setCategory("Salary");
                            }}
                        />
                        <span>💵 Income</span>
                    </label>

                    <label className="radio-label">
                        <input
                            type="radio"
                            value="expense"
                            checked={type === "expense"}
                            onChange={(e) => {
                                setType(e.target.value);
                                setCategory("Food");
                            }}
                        />
                        <span>💸 Expense</span>
                    </label>
                </div>
            </div>

            {/* Category Selection */}
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select"
                >
                    {currentCategories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Submit Button */}
            <div className="form-buttons">
                <button type="submit" className="btn-primary">
                    {editingId ? "✓ Update" : "✓ Add Transaction"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn-secondary"
                    >
                        ✕ Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default ExpenseForm;