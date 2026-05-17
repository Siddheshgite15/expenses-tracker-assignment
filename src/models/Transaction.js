/**
 * Transaction Model
 * Represents a single financial transaction with all details
 */
export default class Transaction {
    constructor(id, title, amount, category = "Other", date = new Date()) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.date = date instanceof Date ? date.toISOString() : date;
    }

    /**
     * Format date for display
     * @returns {string} Formatted date
     */
    getFormattedDate() {
        const date = new Date(this.date);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    /**
     * Get time for display
     * @returns {string} Formatted time
     */
    getFormattedTime() {
        const date = new Date(this.date);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}