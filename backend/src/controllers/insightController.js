import Transaction from '../models/Transaction.js';
import { generateSpendingInsights } from '../services/aiService.js';

export const getSpendingInsights = async (req, res) => {
  try {
    // Get only the logged-in user's transactions
    const transactions = await Transaction.find({
      user: req.userId,
    });

    // User needs transactions before AI can analyze anything
    if (transactions.length === 0) {
      return res.status(400).json({
        message: 'Add some transactions before generating AI insights.',
      });
    }

    // Calculate total income
    const income = transactions.filter((transaction) => transaction.type === 'income')
      .reduce(
        (total, transaction) => total + transaction.amount,
        0
      );

    // Calculate total expenses
    const expenses = transactions.filter((transaction) => transaction.type === 'expense')
      .reduce(
        (total, transaction) => total + transaction.amount,
        0
      );

    // Calculate remaining balance
    const balance = income - expenses;

    // Calculate savings rate
    const savingsRate =
      income > 0
        ? ((income - expenses) / income) * 100
        : 0;

    // Calculate expense totals by category
    const categories = {};

    transactions
      .filter((transaction) => transaction.type === 'expense')
      .forEach((transaction) => {
        categories[transaction.category] =
          (categories[transaction.category] || 0) +
          transaction.amount;
      });

    // Create clean summary for Gemini
    const financialSummary = {
      income: Number(income.toFixed(2)),
      expenses: Number(expenses.toFixed(2)),
      balance: Number(balance.toFixed(2)),
      savingsRate: Number(savingsRate.toFixed(2)),
      categories,
      transactionCount: transactions.length,
    };

    // Send the calculated summary to Gemini
    const aiResult = await generateSpendingInsights(
      financialSummary
    );

    // Send everything back to React
    return res.status(200).json({
      summary: financialSummary,
      insights: aiResult.insights,
    });
  } catch (error) {
    console.error('Failed to generate AI insights:', error);

    return res.status(500).json({
      message: 'Failed to generate spending insights.',
    });
  }
};