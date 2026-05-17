/**
 * TransactionItem Component
 * Displays individual transaction details
 */
function TransactionItem({
    transaction,
    deleteTransaction,
    editTransaction,
    isEditing,
}) {

    const isIncome = transaction.amount > 0;

    return (
        <li className={`transaction-item ${isIncome ? "income" : "expense"} ${
            isEditing ? "editing" : ""
        }`}>
            <div className="transaction-main">
                <div className="transaction-info">
                    <h4 className="transaction-title">{transaction.title}</h4>
                    <div className="transaction-meta">
                        <span className="transaction-category">
                            {transaction.category || "Other"}
                        </span>
                        <span className="transaction-date">
                            {transaction.getFormattedDate()}
                        </span>
                        <span className="transaction-time">
                            {transaction.getFormattedTime()}
                        </span>
                    </div>
                </div>

                <div className="transaction-amount">
                    <span
                        className={`amount ${isIncome ? "income" : "expense"}`}
                    >
                        {isIncome ? "+" : "-"} ₹{" "}
                        {Math.abs(transaction.amount).toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="transaction-actions">
                <button
                    className="btn-edit"
                    onClick={() => editTransaction(transaction.id)}
                    title="Edit transaction"
                    aria-label="Edit transaction"
                >
                    ✏️
                </button>
                <button
                    className="btn-delete"
                    onClick={() => deleteTransaction(transaction.id)}
                    title="Delete transaction"
                    aria-label="Delete transaction"
                >
                    🗑️
                </button>
            </div>
        </li>
    );
}

export default TransactionItem;
