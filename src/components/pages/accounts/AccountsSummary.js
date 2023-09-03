import React, { useEffect, useState } from 'react'
import { Collapse } from '@/Components/utility'
import useAuth from '@/Contexts/useAuth'
import useAccountCalculations from '@/Hooks/useAccountCalculations'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/Firebase/index';

const AccountsSummary = ({
    accounts,
}) => {
    const { user } = useAuth()
    // useAccountCalculations Hook
    const { truncateAmount } = useAccountCalculations()
    const [allTxns, setAllTxns] = useState([])
    useEffect(() => {
        onSnapshot(collection(db, 'users', user.uid, 'transactions'), (snapshot) => {
            setAllTxns(snapshot.docs.map(doc => ({
                id: doc.id,
                //  transactionAccountID: doc.data().transactionAccountID,
                // find the account type from the accounts array
                accountType: accounts.find(account => account.id === doc.data().transactionAccountID)?.accountType,
                ...doc.data()
            })))
        })
    }, [user.uid, accounts])
    // console.log(allTxns);

    const [totalBalance, setTotalBalance] = useState(0)
    const [totalCreditLeft, setTotalCreditLeft] = useState(0)
    const [totalCreditSpent, setTotalCreditSpent] = useState(0)

    // Calculate the total balance
    useEffect(() => {
        // add all opening balances of accountType !=='Credit Card' with all the transactions from accountType !== 'Credit Card' based on transactionType
        setTotalBalance(
            truncateAmount(
                accounts
                    .filter(account => account.accountType !== 'Credit Card')
                    .reduce((acc, account) => acc + account.accountOpeningBalance, 0)
                +
                allTxns
                    .filter(txn => txn.accountType !== 'Credit Card')
                    .reduce((acc, txn) => txn.transactionType === 'Income' ? acc + txn.transactionAmount : acc - txn.transactionAmount, 0)
            )
        )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTxns, accounts])

    // Calculate the total credit left
    useEffect(() => {
        // add all credit limit of accountType ==='Credit Card' and subtract all the transactions from accountType === 'Credit Card' based on transactionType === 'Expense' and add all the transactions from accountType === 'Credit Card' based on transactionType === 'Income'
        setTotalCreditLeft(
            truncateAmount(
                accounts
                    .filter(account => account.accountType === 'Credit Card')
                    .reduce((acc, account) => acc + account.accountCreditLimit, 0)
                -
                allTxns
                    .filter(txn => txn.accountType === 'Credit Card')
                    .reduce((acc, txn) => txn.transactionType === 'Expense' ? acc + txn.transactionAmount : acc, 0)
                +
                allTxns
                    .filter(txn => txn.accountType === 'Credit Card')
                    .reduce((acc, txn) => txn.transactionType === 'Income' ? acc + txn.transactionAmount : acc, 0)
            )
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTxns, accounts])

    // Calculate the total credit spent
    useEffect(() => {
        // add all the transactions from accountType === 'Credit Card' based on transactionType === 'Expense' and subtract all the transactions from accountType === 'Credit Card' based on transactionType === 'Income'
        setTotalCreditSpent(
            truncateAmount(
                allTxns
                    .filter(txn => txn.accountType === 'Credit Card')
                    .reduce((acc, txn) => txn.transactionType === 'Expense' ? acc + txn.transactionAmount : acc, 0)
                -
                allTxns
                    .filter(txn => txn.accountType === 'Credit Card')
                    .reduce((acc, txn) => txn.transactionType === 'Income' ? acc + txn.transactionAmount : acc, 0)
            )
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTxns, accounts])

    return (
        <Collapse title={'Accounts Summary'} width={'100%'}>
            <div className='flex justify-around items-center p-1 gap-2 font-medium' >
                <div className="flex flex-col gap-1 justify-center items-center text-success-600 w-full p-2">
                    <span className='text-lg'>
                        ₹{totalBalance}
                    </span>
                    <span className='text-[10px]'>
                        Balance
                    </span>
                </div>
                <div className='text-layout-300'>
                    |
                </div>
                <div className="flex flex-col gap-1 justify-center items-center text-success-600 w-full p-2">
                    <span className='text-lg'>
                        ₹{totalCreditLeft}
                    </span>
                    <span className='text-[10px]'>
                        Credit Left
                    </span>
                </div>
                <div className='text-layout-300'>
                    |
                </div>
                <div className="flex flex-col gap-1 justify-center items-center text-error-600 w-full p-2">
                    <span className='text-lg'>
                        ₹{totalCreditSpent}
                    </span>
                    <span className='text-[10px]'>
                        Credit Spent
                    </span>
                </div>
            </div>
        </Collapse>
    )
}

export default AccountsSummary