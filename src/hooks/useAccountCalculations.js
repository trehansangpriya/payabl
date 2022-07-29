const useAccountCalculations = () => {
    const accountBalance = (txns = [], openingBalance) => {
        // if transaction type is 'credit' add amount to opening balance
        // if transaction type is 'debit' subtract amount from opening balance
        return txns.reduce((acc, txn) => {
            if (txn.txnType === 'CREDIT') {
                const balance = acc + txn.txnAmount
                return balance
            }
            if (txn.txnType === 'DEBIT') {
                const balance = acc - txn.txnAmount
                return balance
            }
        }, openingBalance)
    }
    const truncateAmount = (amount) => {
        // if amount is > 999 then divide by 1000 and add a K at the end
        if (amount > 999 && amount < 100000) {
            const truncAmount = amount / 1000
            return truncAmount + "K"
        }
        if (amount > 99999) {
            const truncAmount = amount / 100000
            return truncAmount.toPrecision(2) + "L"
        }
        return amount
    }
    return {
        accountBalance,
        truncateAmount
    }
}

export default useAccountCalculations