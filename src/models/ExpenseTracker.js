/**
 * ExpenseTracker Model
 * Manages all financial transactions with filtering and analytics capabilities
 */
export default class ExpenseTracker {

    constructor() {
        this.transactions =
            JSON.parse(localStorage.getItem("transactions")) || [];
    }

    /**
     * Add a new transaction
     * @param {Transaction} transaction
     */
    addTransaction(transaction) {
        this.transactions.push(transaction);
        this.saveTransactions();
    }

    /**
     * Update an existing transaction
     * @param {number} id
     * @param {Transaction} updatedTransaction
     */
    updateTransaction(id, updatedTransaction) {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index !== -1) {
            this.transactions[index] = updatedTransaction;
            this.saveTransactions();
        }
    }

    /**
     * Delete a transaction by ID
     * @param {number} id
     */
    deleteTransaction(id) {
        this.transactions =
            this.transactions.filter(
                transaction => transaction.id !== id
            );

        this.saveTransactions();
    }

    /**
     * Get all transactions
     * @returns {Array} Array of transactions
     */
    getTransactions() {
        return this.transactions;
    }

    /**
     * Get transactions filtered by category
     * @param {string} category
     * @returns {Array} Filtered transactions
     */
    getTransactionsByCategory(category) {
        return this.transactions.filter(t => t.category === category);
    }

    /**
     * Get transactions within a date range
     * @param {Date} startDate
     * @param {Date} endDate
     * @returns {Array} Filtered transactions
     */
    getTransactionsByDateRange(startDate, endDate) {
        return this.transactions.filter(t => {
            const tDate = new Date(t.date);
            return tDate >= startDate && tDate <= endDate;
        });
    }

    /**
     * Get all unique categories used
     * @returns {Array} Array of category names
     */
    getCategories() {
        const categories = new Set();
        this.transactions.forEach(t => {
            if (t.category) categories.add(t.category);
        });
        return Array.from(categories).sort();
    }

    /**
     * Calculate total balance
     * @returns {number} Balance amount
     */
    getBalance() {
        return this.transactions.reduce(
            (total, transaction) =>
                total + Number(transaction.amount),
            0
        );
    }

    /**
     * Calculate total income
     * @returns {number} Income amount
     */
    getIncome() {
        return this.transactions
            .filter(transaction => transaction.amount > 0)
            .reduce((acc, item) => acc + Number(item.amount), 0);
    }

    /**
     * Calculate total expenses
     * @returns {number} Expense amount
     */
    getExpense() {
        return this.transactions
            .filter(transaction => transaction.amount < 0)
            .reduce((acc, item) => acc + Number(item.amount), 0);
    }

    /**
     * Get spending breakdown by category
     * @returns {Object} Category-wise spending
     */
    getSpendingByCategory() {
        const spending = {};
        this.transactions.forEach(t => {
            if (t.amount < 0) {
                if (!spending[t.category]) {
                    spending[t.category] = 0;
                }
                spending[t.category] += Math.abs(t.amount);
            }
        });
        return spending;
    }

    /**
     * Search transactions by title
     * @param {string} query
     * @returns {Array} Matching transactions
     */
    searchTransactions(query) {
        const lowerQuery = query.toLowerCase();
        return this.transactions.filter(t =>
            t.title.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Save transactions to localStorage
     */
    saveTransactions() {
        localStorage.setItem(
            "transactions",
            JSON.stringify(this.transactions)
        );
    }
}