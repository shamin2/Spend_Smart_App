import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const moneyFormatter = (amount) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount);
};

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <div className="income-expenses">
      <div className="summary-card summary-card--income">
        <p className="summary-card__label">Income</p>

        <h2 className="summary-card__amount">
          +{moneyFormatter(income)}
        </h2>

        <p className="summary-card__subtitle">
          Total money earned
        </p>
      </div>

      <div className="summary-card summary-card--expense">
        <p className="summary-card__label">Expenses</p>

        <h2 className="summary-card__amount">
          -{moneyFormatter(expenses)}
        </h2>

        <p className="summary-card__subtitle">
          Total money spent
        </p>
      </div>
    </div>
  );
};