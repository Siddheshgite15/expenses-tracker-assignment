import { useState, useEffect } from "react";

import "./App.css";

import Transaction from "./models/Transaction";
import ExpenseTracker from "./models/ExpenseTracker";

import Balance from "./components/Balance";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Statistics from "./components/Statistics";
import FilterPanel from "./components/FilterPanel";

/**
 * Main App Component
 * Manages the entire expense tracker application
 */
function App() {

    const tracker = new ExpenseTracker();

    const [transactions, setTransactions] = useState(tracker.getTransactions());
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });
    const [editingId, setEditingId] = useState(null);
    const [filteredCategory, setFilteredCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [showStats, setShowStats] = useState(true);

    // Apply dark mode on load
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
        localStorage.setItem("darkMode", isDarkMode);
    }, [isDarkMode]);

    /**
     * Add or update transaction
     */
    const addTransaction = (title, amount, category) => {
        if (editingId) {
            const updatedTransaction = new Transaction(
                editingId,
                title,
                amount,
                category,
                transactions.find(t => t.id === editingId)?.date
            );
            tracker.updateTransaction(editingId, updatedTransaction);
            setEditingId(null);
        } else {
            const newTransaction = new Transaction(
                Date.now(),
                title,
                amount,
                category
            );
            tracker.addTransaction(newTransaction);
        }
        setTransactions([...tracker.getTransactions()]);
    };

    /**
     * Delete transaction
     */
    const deleteTransaction = (id) => {
        tracker.deleteTransaction(id);
        setTransactions([...tracker.getTransactions()]);
    };

    /**
     * Start editing a transaction
     */
    const editTransaction = (id) => {
        setEditingId(id);
    };

    /**
     * Cancel editing
     */
    const cancelEdit = () => {
        setEditingId(null);
    };

    /**
     * Export transactions as CSV
     */
    const exportToCSV = () => {
        const headers = ["Date", "Title", "Category", "Amount"];
        const rows = transactions.map(t => [
            new Date(t.date).toLocaleDateString('en-IN'),
            t.title,
            t.category || "Other",
            t.amount
        ]);

        let csvContent = headers.join(",") + "\n";
        rows.forEach(row => {
            csvContent += row.map(cell => `"${cell}"`).join(",") + "\n";
        });

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `expense-tracker-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    /**
     * Get filtered transactions
     */
    const getFilteredTransactions = () => {
        let filtered = transactions;

        if (filteredCategory !== "All") {
            filtered = filtered.filter(t => t.category === filteredCategory);
        }

        if (searchQuery) {
            filtered = filtered.filter(t =>
                t.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    const filteredTransactions = getFilteredTransactions();

    return (
        <div className={`app-container ${isDarkMode ? "dark" : ""}`}>
            {/* Header with theme toggle */}
            <header className="app-header">
                <h1>💰 Expense Tracker</h1>
                <button
                    className="theme-toggle"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    title={isDarkMode ? "Light Mode" : "Dark Mode"}
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? "☀️" : "🌙"}
                </button>
            </header>

            {/* Balance Display */}
            <Balance
                balance={tracker.getBalance()}
                income={tracker.getIncome()}
                expense={tracker.getExpense()}
            />

            {/* Statistics Section */}
            {showStats && (
                <Statistics
                    transactions={transactions}
                    onToggle={() => setShowStats(false)}
                />
            )}

            {/* Add/Edit Transaction Form */}
            <ExpenseForm
                addTransaction={addTransaction}
                editingId={editingId}
                editingTransaction={transactions.find(t => t.id === editingId)}
                onCancelEdit={cancelEdit}
                tracker={tracker}
            />

            {/* Filter and Search Panel */}
            <FilterPanel
                categories={tracker.getCategories()}
                selectedCategory={filteredCategory}
                onCategoryChange={setFilteredCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {/* Export Button */}
            <div className="action-buttons">
                <button
                    className="export-btn"
                    onClick={exportToCSV}
                    disabled={transactions.length === 0}
                >
                    📥 Export to CSV
                </button>
                {!showStats && (
                    <button
                        className="export-btn"
                        onClick={() => setShowStats(true)}
                    >
                        📊 Show Stats
                    </button>
                )}
            </div>

            {/* Transaction History */}
            <ExpenseList
                transactions={filteredTransactions}
                deleteTransaction={deleteTransaction}
                editTransaction={editTransaction}
                editingId={editingId}
            />

            {/* Empty State */}
            {transactions.length === 0 && (
                <div className="empty-state">
                    <p>📝 No transactions yet. Start by adding one!</p>
                </div>
            )}

            {/* No Results State */}
            {transactions.length > 0 && filteredTransactions.length === 0 && (
                <div className="empty-state">
                    <p>🔍 No transactions match your filters</p>
                </div>
            )}
        </div>
    );
}

export default App;