import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import AppReducer from './AppReducer';
import { AuthContext } from './AuthContext';

const API_URL = 'http://localhost:5002/api/transactions';

const initialState = {
  transactions: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({
      message,
      type,
    });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  // Get logged-in user's transactions
  const getTransactions = async () => {
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to get transactions'
        );
      }

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: data,
      });
    } catch (error) {
      console.error(
        'Failed to get transactions:',
        error
      );

      showNotification(
        error.message || 'Failed to load transactions.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // Add transaction
  const addTransaction = async (transaction) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(transaction),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to add transaction'
        );
      }

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: data,
      });

      showNotification(
        'Transaction added successfully.',
        'success'
      );

      return true;
    } catch (error) {
      console.error(
        'Failed to add transaction:',
        error
      );

      showNotification(
        error.message || 'Failed to add transaction.',
        'error'
      );

      return false;
    }
  };

  // Update transaction
  const updateTransaction = async (id, transaction) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(transaction),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to update transaction'
        );
      }

      dispatch({
        type: 'UPDATE_TRANSACTION',
        payload: data,
      });

      showNotification(
        'Transaction updated successfully.',
        'success'
      );

      return true;
    } catch (error) {
      console.error(
        'Failed to update transaction:',
        error
      );

      showNotification(
        error.message || 'Failed to update transaction.',
        'error'
      );

      return false;
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to delete transaction'
        );
      }

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });

      showNotification(
        'Transaction deleted successfully.',
        'success'
      );

      return true;
    } catch (error) {
      console.error(
        'Failed to delete transaction:',
        error
      );

      showNotification(
        error.message || 'Failed to delete transaction.',
        'error'
      );

      return false;
    }
  };

  useEffect(() => {
    if (token) {
      getTransactions();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        loading,
        notification,
        clearNotification,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};