/**
 * Balance Component
 * Displays current balance, income, and expenses
 */
function Balance({ balance, income, expense }) {

    return (
        <div className="balance-container">
            {/* Main Balance */}
            <div className="balance-main">
                <h2>💼 Current Balance</h2>
                <div
                    className={`balance-amount ${
                        balance >= 0 ? "positive" : "negative"
                    }`}
                >
                    ₹ {balance.toFixed(2)}
                </div>
            </div>

            {/* Income and Expense Summary */}
            <div className="income-expense">
                <div className="income-box">
                    <div className="box-icon">📈</div>
                    <h3>Income</h3>
                    <p className="amount income">+ ₹ {income.toFixed(2)}</p>
                </div>

                <div className="expense-box">
                    <div className="box-icon">📉</div>
                    <h3>Expenses</h3>
                    <p className="amount expense">
                        - ₹ {Math.abs(expense).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Balance;
