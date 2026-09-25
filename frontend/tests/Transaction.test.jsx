import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Transaction } from '../src/components/Transaction';
import { GlobalContext } from '../src/context/GlobalState';

describe('Transaction component', () => {
  const mockTransaction = { id: 1, text: 'Test Transaction', amount: -500 };
  const deleteTransactionMock = jest.fn();

  beforeEach(() => {
    render(
      <GlobalContext.Provider value={{ deleteTransaction: deleteTransactionMock }}>
        <Transaction transaction={mockTransaction} />
      </GlobalContext.Provider>
    );
  });

  test('renders transaction text and amount with correct formatting', () => {
    const transactionText = screen.getByText(mockTransaction.text);
    const transactionAmount = screen.getByText(/\$ ?500.00/); // Using regex to match amount with optional space

    expect(transactionText).toBeInTheDocument();
    expect(transactionAmount).toBeInTheDocument();
  });

  test('calls deleteTransaction on delete button click', () => {
    const deleteButton = screen.getByRole('button', { name: /x/i });

    fireEvent.click(deleteButton);

    // Check if deleteTransaction was called with the correct id
    expect(deleteTransactionMock).toHaveBeenCalledWith(mockTransaction.id);
  });
});
