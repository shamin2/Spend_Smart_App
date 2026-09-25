import React, {
  useContext,
  useState,
} from 'react';

import { GlobalContext } from '../context/GlobalState';
import { ConfirmModal } from './ConfirmModal';

const moneyFormatter = (amount) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount);
};

export const Transaction = ({ transaction }) => {
  const {
    deleteTransaction,
    updateTransaction,
  } = useContext(GlobalContext);

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [text, setText] = useState(transaction.text);
  const [amount, setAmount] = useState(transaction.amount);
  const [type, setType] = useState(transaction.type);
  const [category, setCategory] = useState(
    transaction.category
  );

  const isIncome = transaction.type === 'income';

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedTransaction = {
      text,
      amount: Number(amount),
      type,
      category,
    };

    const success = await updateTransaction(
      transaction._id,
      updatedTransaction
    );

    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setText(transaction.text);
    setAmount(transaction.amount);
    setType(transaction.type);
    setCategory(transaction.category);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    const success = await deleteTransaction(
      transaction._id
    );

    setIsDeleting(false);

    if (success) {
      setShowDeleteModal(false);
    }
  };

  if (isEditing) {
    return (
      <li className="transaction transaction--editing">
        <form
          className="transaction-edit-form"
          onSubmit={handleUpdate}
        >
          <div className="form-group">
            <label>Description</label>

            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Amount</label>

            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Type</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Food">Food</option>
              <option value="Housing">Housing</option>
              <option value="Transportation">
                Transportation
              </option>
              <option value="Entertainment">
                Entertainment
              </option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Salary">Salary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="transaction-edit-actions">
            <button
              className="transaction-edit-save"
              type="submit"
            >
              Save
            </button>

            <button
              className="transaction-edit-cancel"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <>
      <li className="transaction">
        <div className="transaction__info">
          <div
            className={`transaction__icon ${
              isIncome
                ? 'transaction__icon--income'
                : 'transaction__icon--expense'
            }`}
          >
            {isIncome ? '↑' : '↓'}
          </div>

          <div>
            <h4 className="transaction__name">
              {transaction.text}
            </h4>

            <p className="transaction__category">
              {transaction.category}
            </p>
          </div>
        </div>

        <div className="transaction__right">
          <span
            className={`transaction__amount ${
              isIncome
                ? 'transaction__amount--income'
                : 'transaction__amount--expense'
            }`}
          >
            {isIncome ? '+' : '-'}
            {moneyFormatter(transaction.amount)}
          </span>

          <button
            className="transaction__edit"
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label={`Edit ${transaction.text}`}
          >
            ✎
          </button>

          <button
            className="transaction__delete"
            type="button"
            onClick={() => setShowDeleteModal(true)}
            aria-label={`Delete ${transaction.text}`}
          >
            ×
          </button>
        </div>
      </li>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete transaction?"
        message={`Are you sure you want to delete "${transaction.text}"? This action cannot be undone.`}
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        danger
        onConfirm={handleDelete}
        onCancel={() => {
          if (!isDeleting) {
            setShowDeleteModal(false);
          }
        }}
      />
    </>
  );
};