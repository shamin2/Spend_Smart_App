import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TransactionList } from '../src/components/TransactionList';
import { GlobalContext } from '../src/context/GlobalState';

describe('TransactionList component', () => {
  const mockTransactions = [
    { id: 1, text: 'Salary', amount: 1000 },
    { id: 2, text: 'Groceries', amount: -200 },
  ];

  const renderWithContext = (component) => {
    return render(
      <GlobalContext.Provider value={{ transactions: mockTransactions }}>
        {component}
      </GlobalContext.Provider>
    );
  };

  test('renders "History" heading', () => {
    renderWithContext(<TransactionList />);
    const heading = screen.getByText(/history/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders a list of transactions with correct text and amount formatting', () => {
    renderWithContext(<TransactionList />);

    // Check transaction texts
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();

    // Use flexible approach for transaction amounts
    expect(screen.getByText(/\+\s?\$\s?1,000\.00/)).toBeInTheDocument();
    expect(screen.getByText(/-\s?\$\s?200\.00/)).toBeInTheDocument();
  });
});
