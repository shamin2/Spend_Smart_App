import Transaction from '../models/Transaction.js';

// Get logged-in user's transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get transactions',
      error: error.message,
    });
  }
};

// Add transaction
export const addTransaction = async (req, res) => {
  try {
    const { text, amount, type, category, date } = req.body;

    const transaction = await Transaction.create({
      user: req.userId,
      text,
      amount,
      type,
      category,
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to add transaction',
      error: error.message,
    });
  }
};

// Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found',
      });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: after,
        runValidators: true,
      }
    );

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update transaction',
      error: error.message,
    });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found',
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      message: 'Transaction deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete transaction',
      error: error.message,
    });
  }
};