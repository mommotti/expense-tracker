import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Transaction } from './Transaction'
export const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext)
    useEffect(() => {
        getTransactions()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <h3 className="gray-text">Transactions </h3>
            {transactions.length > 0 ?
                <ul className="list">
                    {transactions.map(transaction => (
                        <Transaction key={transaction.id} transaction={transaction} />
                    ))}
                </ul> :
                <span className="info"><span className="info2"> Your transactions will appear here</span></span>
            }
        </>
    )
}
