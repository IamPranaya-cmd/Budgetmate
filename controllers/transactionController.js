const Transaction = require("../models/Transaction");

// Add new transaction
const addTransaction = async (req, res) => {
    try {
        const { type, category, amount } = req.body;
        const transaction = new Transaction({ type, category, amount });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: "Error adding transaction" });
    }
};

// Get all transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching transactions" });
    }
};

module.exports = { addTransaction, getTransactions };
