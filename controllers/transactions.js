const Transaction = require('../models/Transaction')

// @desc   Get all transactions 
// @route  GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({})
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc   Add one transaction 
// @route  POST /api/v1/transactions
// @access Public
exports.addTransaction = async (req, res, next) => {
    try {
        const { text, amount } = req.body

        const transaction = await Transaction.create(req.body)

        res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message)

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }
    }

}

// @desc   Delete one transaction
// @route  DELETE /api/v1/transactions/:id
// @access Public
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id)

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: "No transaction found"
            })
        }
        await transaction.remove()
        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}