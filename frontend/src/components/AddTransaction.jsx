import React, { useContext, useState } from 'react';

import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      text,
      amount: Number(amount),
      type,
      category,
    };

    await addTransaction(newTransaction);

    setText('');
    setAmount('');
  };

  return (
    <div className="add-transaction">
      <div className="section-header">
        <div>
          <p className="section-header__eyebrow">NEW ENTRY</p>
          <h2>Add Transaction</h2>
        </div>
      </div>

      <form className="transaction-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Description</label>

          <input
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Groceries"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>

          <div className="amount-input">
            <span>$</span>

            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Transaction Type</label>

          <div className="type-selector">
            <button
              type="button"
              className={`type-selector__button ${
                type === 'expense' ? 'type-selector__button--active' : ''
              }`}
              onClick={() => setType('expense')}
            >
              Expense
            </button>

            <button
              type="button"
              className={`type-selector__button ${
                type === 'income' ? 'type-selector__button--active' : ''
              }`}
              onClick={() => setType('income')}
            >
              Income
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Salary">Salary</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button className="submit-button" type="submit">
          <span>+</span>
          Add Transaction
        </button>
      </form>
    </div>
  );
};