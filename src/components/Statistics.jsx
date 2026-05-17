/**
 * Statistics Component
 * Displays spending breakdown by category and transaction statistics
 */

function Statistics({ transactions, onToggle }) {

    /**
     * Get spending breakdown by category
     */
    const getSpendingByCategory = () => {
        const spending = {};
        transactions.forEach(t => {
            if (t.amount < 0) {
                const category = t.category || "Other";
                spending[category] = (spending[category] || 0) + Math.abs(t.amount);
            }
        });
        return spending;
    };

    /**
     * Get top transaction
     */
    const getTopSpending = () => {
        if (transactions.length === 0) return null;
        const expenses = transactions.filter(t => t.amount < 0);
        if (expenses.length === 0) return null;
        return expenses.reduce((max, t) =>
            Math.abs(t.amount) > Math.abs(max.amount) ? t : max
        );
    };

    /**
     * Get average transaction
     */
    const getAverageTransaction = () => {
        if (transactions.length === 0) return 0;
        const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
        return (total / transactions.length).toFixed(2);
    };

    const spendingByCategory = getSpendingByCategory();
    const topSpending = getTopSpending();
    const avgTransaction = getAverageTransaction();
    const totalTransactions = transactions.length;

    return (
        <div className="statistics-container">
            <div className="stats-header">
                <h2>📊 Statistics & Insights</h2>
                <button
                    className="close-stats"
                    onClick={onToggle}
                    title="Close statistics"
                    aria-label="Close statistics"
                >
                    ✕
                </button>
            </div>

            <div className="stats-grid">
                {/* Total Transactions */}
                <div className="stat-card">
                    <div className="stat-icon">📈</div>
                    <div className="stat-content">
                        <h3>Total Transactions</h3>
                        <p className="stat-value">{totalTransactions}</p>
                    </div>
                </div>

                {/* Average Transaction */}
                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <h3>Average Amount</h3>
                        <p className="stat-value">₹ {avgTransaction}</p>
                    </div>
                </div>

                {/* Top Spending */}
                <div className="stat-card">
                    <div className="stat-icon">💸</div>
                    <div className="stat-content">
                        <h3>Highest Transaction</h3>
                        <p className="stat-value">
                            {topSpending
                                ? `₹ ${Math.abs(topSpending.amount).toFixed(2)}`
                                : "N/A"
                            }
                        </p>
                        {topSpending && (
                            <p className="stat-description">{topSpending.title}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Category Breakdown */}
            {Object.keys(spendingByCategory).length > 0 && (
                <div className="category-breakdown">
                    <h3>💰 Spending by Category</h3>
                    <div className="category-list">
                        {Object.entries(spendingByCategory)
                            .sort(([, a], [, b]) => b - a)
                            .map(([category, amount]) => (
                                <div key={category} className="category-item">
                                    <span className="category-name">{category}</span>
                                    <div className="category-bar">
                                        <div
                                            className="category-progress"
                                            style={{
                                                width: `${(
                                                    (amount /
                                                        Object.values(spendingByCategory).reduce(
                                                            (a, b) => a + b,
                                                            0
                                                        )) *
                                                    100
                                                ).toFixed(0)}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <span className="category-amount">
                                        ₹ {amount.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Statistics;
