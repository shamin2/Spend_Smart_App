import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const moneyFormatter = (amount) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount);
};

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expenses;

  return (
    <div className="balance-card">
      <p className="balance-card__label">Total Balance</p>

      <h1 className="balance-card__amount">
        {moneyFormatter(balance)}
      </h1>

      <p className="balance-card__subtitle">
        Your current financial balance
      </p>
    </div>
  );
};