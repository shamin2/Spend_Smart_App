import React, { useContext } from 'react';

import { GlobalContext } from '../context/GlobalState';

const moneyFormatter = (amount) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount);
};

export const BalanceWarning = () => {
  const { transactions, loading } =
    useContext(GlobalContext);

  if (loading || transactions.length === 0) {
    return null;
  }

  const income = transactions
    .filter(
      (transaction) =>
        transaction.type === 'income'
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const expenses = transactions
    .filter(
      (transaction) =>
        transaction.type === 'expense'
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const balance = income - expenses;

  if (balance > 500) {
    return null;
  }

  if (balance <= 0) {
    return (
      <div className="balance-warning balance-warning--danger">
        <div className="balance-warning__icon">
          !
        </div>

        <div>
          <h3>Expenses exceed your income</h3>

          <p>
            Your expenses are currently{' '}
            <strong>
              {moneyFormatter(Math.abs(balance))}
            </strong>{' '}
            higher than your available income.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="balance-warning balance-warning--warning">
      <div className="balance-warning__icon">
        !
      </div>

      <div>
        <h3>Your balance is getting low</h3>

        <p>
          You currently have{' '}
          <strong>{moneyFormatter(balance)}</strong>{' '}
          remaining. Consider reviewing your recent
          expenses.
        </p>
      </div>
    </div>
  );
};