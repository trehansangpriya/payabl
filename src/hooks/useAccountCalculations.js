const useAccountCalculations = () => {
    const accountBalance = (txns = [], openingBalance) => {
        // if transaction type is 'credit' add amount to opening balance
        // if transaction type is 'debit' subtract amount from opening balance
        return txns.reduce((acc, txn) => {
            if (txn.txnType === 'Income') {
                const balance = acc + txn.txnAmount
                return balance
            }
            if (txn.txnType === 'Expense') {
                const balance = acc - txn.txnAmount
                return balance
            }
        }, openingBalance)
    }

    const accountBalanceWithID = (txns = [], accountID, openingBalance) => {
        // if transaction type is 'credit' add amount to opening balance
        // if transaction type is 'debit' subtract amount from opening balance
        console.log('accountBalanceWithID', accountID);
        console.log('accountBalanceWithID', txns);
        return txns.filter(txn => txn.txnAccount === accountID).reduce((acc, txn) => {
            if (txn.txnType === 'Income') {
                const balance = acc + txn.txnAmount
                return balance
            }
            if (txn.txnType === 'Expense') {
                const balance = acc - txn.txnAmount
                return balance
            }
        }, openingBalance)
    }
    const truncateAmount = (amount) => {
        // if amount is > 999 then divide by 1000 and add a K at the end
        if (amount > 999 && amount < 10000) {
            const truncAmount = amount / 1000
            return truncAmount.toPrecision(2) + "K"
        }
        if (amount > 9999 && amount < 100000) {
            const truncAmount = amount / 1000
            return truncAmount.toPrecision(3) + "K"
        }
        if (amount > 99999) {
            const truncAmount = amount / 100000
            return truncAmount.toPrecision(2) + "L"
        }
        return amount
    }
    return {
        accountBalance,
        accountBalanceWithID,
        truncateAmount
    }
}

export default useAccountCalculations