import TransactionItem from "./TransactionItem";

/**
 * ExpenseList Component
 * Displays list of transactions
 */
function ExpenseList({
    transactions,
    deleteTransaction,
    editTransaction,
    editingId,
}) {

    return (
        <div className="expense-list">
            <h2>📋 Transaction History</h2>

            {transactions.length === 0 ? (
                <p className="empty-list">No transactions to display</p>
            ) : (
                <ul>
                    {transactions.map((transaction) => (
                        <TransactionItem
                            key={transaction.id}
                            transaction={transaction}
                            deleteTransaction={deleteTransaction}
                            editTransaction={editTransaction}
                            isEditing={editingId === transaction.id}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ExpenseList;
