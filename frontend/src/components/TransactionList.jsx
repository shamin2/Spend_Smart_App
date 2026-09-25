import React, { useContext } from 'react';

import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const {
    transactions,
    loading,
  } = useContext(GlobalContext);

  return (
    <section className="transactions-panel">
      <div className="section-header">
        <div>
          <p className="section-header__eyebrow">
            ACTIVITY
          </p>

          <h2>Recent Transactions</h2>
        </div>

        {!loading && (
          <span className="transaction-count">
            {transactions.length}{' '}
            {transactions.length === 1
              ? 'transaction'
              : 'transactions'}
          </span>
        )}
      </div>

      {loading ? (
        <div className="transactions-loading">
          <div className="loading-spinner" />

          <p>Loading your transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">$</div>

          <h3>No transactions yet</h3>

          <p>
            Add your first transaction to start
            tracking your money.
          </p>
        </div>
      ) : (
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <Transaction
              key={transaction._id}
              transaction={transaction}
            />
          ))}
        </ul>
      )}
    </section>
  );
};