import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
    transactions: [
        { id: 1, text: 'Payment 💰', amount: 350 },
        { id: 2, text: 'Grocery shopping 🛒', amount: -56 },
        { id: 3, text: 'Succulent 🌵', amount: -5 },
        { id: 4, text: 'Sold my old gamepad 🎮', amount: 15 }
    ],
    error: null,
    loading: true
}

// Create context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)


    // Actions

    async function getTransactions() {
        try {
            const res = await axios.get("/api/v1/transactions")

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
    }

    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>)
}